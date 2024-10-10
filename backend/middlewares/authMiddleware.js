const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/Users");
const Resource = require("../models/Resource");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("No autorizado, usuario no encontrado");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("No autorizado, fallo del token");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado, sin token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado como administrador" });
  }
};

const isResourceOwner = asyncHandler(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404).json({ message: "Recurso no encontrado" });
  }

  if (
    resource.createdBy.toString() === req.user._id.toString() ||
    req.user.isAdmin
  ) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "No autorizado para realizar esta acción" });
  }
});

module.exports = { protect, isResourceOwner, admin };
