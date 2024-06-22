const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const User = require("../models/Users"); // Importa el modelo User desde el archivo Users.js

// Obtener adopciones de un usuario específico
const getUserAdoptions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const adoptions = await Adoption.find({ user: userId }).populate("pet");
    console.log("User Adoptions:", adoptions); // Mensaje de depuración
    res.status(200).json(adoptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo adopciones del usuario" });
  }
};

// Obtener todas las adopciones
const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user", "username")
      .populate("pet");
    console.log("All Adoptions:", adoptions);
    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error obteniendo todas las adopciones:", error);
    res.status(500).json({ message: "Error obteniendo todas las adopciones" });
  }
};

// Crear una adopción
const createAdoption = async (req, res) => {
  const { userId, petId } = req.body;

  try {
    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user || !pet) {
      return res
        .status(404)
        .json({ message: "Usuario o mascota no encontrado" });
    }

    const adoption = new Adoption({
      user: userId,
      pet: petId,
      createdAt: new Date(),
    });

    await adoption.save();

    // Actualizar el estado de la mascota
    pet.fueAdoptado = true;
    await pet.save();

    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Error creando la adopción" });
  }
};

module.exports = {
  getUserAdoptions,
  getAllAdoptions,
  createAdoption,
};
