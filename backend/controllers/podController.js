const User = require("../models/Users");
const Pet = require("../models/Pet");

const addToPod = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const pet = await Pet.findById(req.body.petId);

    if (!user || !pet) {
      return res
        .status(404)
        .json({ message: "Usuario o mascota no encontrado" });
    }

    if (user.pod.includes(pet._id)) {
      return res.status(400).json({ message: "La mascota ya está en el pod" });
    }

    user.pod.push(pet._id);
    await user.save();

    res.status(200).json({ message: "Mascota agregada al pod", pod: user.pod });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPod = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("pod");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user.pod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromPod = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const petId = req.body.petId;

    if (!user || !petId) {
      return res
        .status(404)
        .json({ message: "Usuario o mascota no encontrado" });
    }

    user.pod = user.pod.filter((pet) => pet.toString() !== petId);
    await user.save();

    res
      .status(200)
      .json({ message: "Mascota eliminada del pod", pod: user.pod });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToPod, getPod, removeFromPod };
