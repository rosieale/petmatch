const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  spaceAvailable: {
    type: String,
    required: false,
  },
  psychologicalReference: {
    type: String,
    required: false,
  },
  economicStatus: {
    type: String,
    required: false,
  },
  numberOfPets: {
    type: Number,
    required: false,
  },
  experienceWithPets: {
    type: String,
    required: false,
  },
  motivation: {
    type: String,
    required: false,
  },
  idPhoto: {
    type: String,
    required: false,
  },
  workProof: {
    type: String,
    required: false,
  },
  pod: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware para encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
