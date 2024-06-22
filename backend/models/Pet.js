const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  fueAdoptado: {
    type: Boolean,
    default: false,
  },
  specialCare: {
    type: Boolean,
    default: false,
  },
  specialCareDetails: {
    type: String,
  },
  spaceRequirement: {
    type: String,
    enum: ["Abierto", "Cerrado", "Ambos"],
    default: "Ambos",
  },
  attentionRequirement: {
    type: String,
    enum: ["Poco", "Medio", "Bastante"],
    default: "Medio",
  },
  strength: {
    type: String,
    enum: ["Sí", "No", "Regular"],
    default: "Regular",
  },
  adoptionImages: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
