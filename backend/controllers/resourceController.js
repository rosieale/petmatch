const Resource = require("../models/Resource");
const { uploadToS3 } = require("../middlewares/uploadMiddleware");

const createResource = async (req, res) => {
  console.log("createResource called");
  try {
    const { title, description, url } = req.body;
    const createdBy = req.user._id;

    if (!title || !description || !url) {
      console.log("Validation error");
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    const newResource = new Resource({
      title,
      description,
      url,
      imageUrl,
      createdBy,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    console.error("Error agregando recurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const updateResource = async (req, res) => {
  console.log("updateResource called");
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;

    const resource = await Resource.findById(id);

    if (!resource) {
      console.log("Resource not found");
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.url = url || resource.url;

    if (req.file) {
      resource.imageUrl = await uploadToS3(req.file);
    }

    await resource.save();
    res.status(200).json(resource);
  } catch (error) {
    console.error("Error actualizando recurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteResource = async (req, res) => {
  console.log("deleteResource called");
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) {
      console.log("Resource not found");
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    await resource.remove();
    res.status(204).json({ message: "Recurso eliminado" });
  } catch (error) {
    console.error("Error eliminando recurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getResource = async (req, res) => {
  console.log("getResource called");
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) {
      console.log("Resource not found");
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    res.status(200).json(resource);
  } catch (error) {
    console.error("Error obteniendo recurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getResources = async (req, res) => {
  console.log("getResources called");
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const resources = await Resource.find().skip(skip).limit(limit);
    const totalResources = await Resource.countDocuments();
    const totalPages = Math.ceil(totalResources / limit);

    res.status(200).json({ resources, totalPages });
  } catch (error) {
    console.error("Error obteniendo recursos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createResource,
  updateResource,
  deleteResource,
  getResource,
  getResources,
};
