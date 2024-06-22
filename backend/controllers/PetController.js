const Pet = require("../models/Pet");
const User = require("../models/Users");
const Adoption = require("../models/Adoption"); // Asegúrate de importar el modelo de adopción
const { uploadToS3 } = require("../middlewares/uploadMiddleware");

const getPets = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const pets = await Pet.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Pet.countDocuments();

    res.status(200).json({
      pets,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      console.log(`Pet with id ${req.params.id} not found.`);
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPet = async (req, res) => {
  try {
    const {
      name,
      age,
      type,
      owner,
      location,
      specialCare,
      specialCareDetails,
      spaceRequirement,
      attentionRequirement,
      strength,
      rating = 1,
    } = req.body;

    const newPet = new Pet({
      name,
      age,
      type,
      owner,
      location,
      specialCare,
      specialCareDetails,
      spaceRequirement,
      attentionRequirement,
      strength,
      rating,
    });

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      newPet.imageUrl = imageUrl;
    }

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error creando mascota:", error);
    res.status(400).json({ message: error.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const updatedPet = req.body;
    const pet = await Pet.findByIdAndUpdate(req.params.id, updatedPet, {
      new: true,
    });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Pet deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markAdoptionAsCompleted = async (req, res) => {
  try {
    const petId = req.params.id;
    const { fueAdoptado } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      console.log(`Pet with id ${petId} not found.`);
      return res.status(404).json({ message: "Pet not found" });
    }

    pet.fueAdoptado = fueAdoptado;
    await pet.save();

    if (!req.user) {
      console.log("User is not authenticated.");
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      console.log(`User with id ${req.user._id} not found.`);
      return res.status(404).json({ message: "User not found" });
    }

    if (fueAdoptado) {
      user.adoptedPets.push(pet._id);
      await user.save();

      const adoption = new Adoption({
        user: user._id,
        pet: pet._id,
      });
      await adoption.save();
    } else {
      user.adoptedPets = user.adoptedPets.filter(
        (adoptedPetId) => adoptedPetId.toString() !== pet._id.toString()
      );
      await user.save();

      await Adoption.findOneAndDelete({ user: user._id, pet: pet._id });
    }

    res.status(200).json(pet);
  } catch (error) {
    console.error("Error in markAdoptionAsCompleted:", error);
    res.status(500).json({ message: error.message });
  }
};

const uploadAdoptionImage = async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      pet.adoptionImages.push(imageUrl);
      await pet.save();
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rateAdoption = async (req, res) => {
  try {
    const petId = req.params.id;
    const { rating } = req.body;
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    pet.rating = rating;
    await pet.save();

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPets = async (req, res) => {
  try {
    const query = req.query.q || "";
    const type = req.query.type || "";
    const location = req.query.location || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchCriteria = {
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { location: { $regex: query, $options: "i" } },
            { type: { $regex: query, $options: "i" } },
          ],
        },
      ],
    };

    if (type) {
      searchCriteria.$and.push({ type: { $regex: type, $options: "i" } });
    }
    if (location) {
      searchCriteria.$and.push({
        location: { $regex: location, $options: "i" },
      });
    }

    const pets = await Pet.find(searchCriteria).skip(skip).limit(limit);
    const count = await Pet.countDocuments(searchCriteria);

    res.status(200).json({
      pets,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  markAdoptionAsCompleted,
  uploadAdoptionImage,
  rateAdoption,
  searchPets,
};
