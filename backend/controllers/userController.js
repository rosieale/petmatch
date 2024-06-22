const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { uploadToS3 } = require("../middlewares/uploadMiddleware");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    country,
    age,
    spaceAvailable,
    psychologicalReference,
    economicStatus,
    numberOfPets,
    experienceWithPets,
    motivation,
  } = req.body;

  try {
    const idPhotoUrl = req.files.idPhoto
      ? await uploadToS3(req.files.idPhoto[0])
      : null;
    const workProofUrl = req.files.workProof
      ? await uploadToS3(req.files.workProof[0])
      : null;

    const newUser = new User({
      username,
      email,
      password,
      phone,
      address,
      country,
      age,
      spaceAvailable,
      psychologicalReference,
      economicStatus,
      numberOfPets,
      experienceWithPets,
      motivation,
      idPhoto: idPhotoUrl,
      workProof: workProofUrl,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error en registerUser:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(500).send(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUserProfile:", error.message);
    res.status(500).send(error.message);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.country = req.body.country || user.country;
      user.age = req.body.age || user.age;
      user.spaceAvailable = req.body.spaceAvailable || user.spaceAvailable;
      user.psychologicalReference =
        req.body.psychologicalReference || user.psychologicalReference;
      user.economicStatus = req.body.economicStatus || user.economicStatus;
      user.numberOfPets = req.body.numberOfPets || user.numberOfPets;
      user.experienceWithPets =
        req.body.experienceWithPets || user.experienceWithPets;
      user.motivation = req.body.motivation || user.motivation;
      user.idPhoto = req.files.idPhoto
        ? await uploadToS3(req.files.idPhoto[0])
        : user.idPhoto;
      user.workProof = req.files.workProof
        ? await uploadToS3(req.files.workProof[0])
        : user.workProof;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error en updateUserProfile:", error.message);
    res.status(500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users, totalPages });
  } catch (error) {
    console.error("Error en getUsers:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error en updateUser:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error en deleteUser:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const getUserAdoptions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("pod");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const adoptedPets = user.pod.filter((pet) => pet.fueAdoptado);

    res.status(200).json(adoptedPets);
  } catch (error) {
    console.error("Error en getUserAdoptions:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getVerificationApplications = async (req, res) => {
  try {
    const users = await User.find().select(
      "username email phone address country age spaceAvailable psychologicalReference economicStatus numberOfPets experienceWithPets motivation idPhoto workProof"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error en getVerificationApplications:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let score = 0;

    if (user.age >= 21) score += 10;
    if (user.spaceAvailable === "Casa con jardín") score += 20;
    if (
      user.economicStatus === "44,000-54,000" ||
      user.economicStatus === "54,000-64,000" ||
      user.economicStatus === "64,000-74,000" ||
      user.economicStatus === "74,000 o más"
    )
      score += 15;
    if (user.experienceWithPets) score += 10;
    if (user.numberOfPets === 0) score += 5;
    if (user.workProof) score += 10;

    const isEligible = score >= 50;

    res.status(200).json({ isEligible, score });
  } catch (error) {
    console.error("Error en verifyUser:", error.message);
    res.status(500).json({ message: "Error verificando al usuario" });
  }
};

const confirmVerification = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Usuario verificado exitosamente" });
  } catch (error) {
    console.error("Error en confirmVerification:", error.message);
    res.status(500).json({ message: "Error confirmando la verificación" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserAdoptions,
  verifyUser,
  getVerificationApplications,
  confirmVerification,
};
