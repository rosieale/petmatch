const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const podRoutes = require("./routes/podRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const User = require("./models/Users"); // Importa el modelo aquí

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/pod", podRoutes);
app.use("/api/adoptions", adoptionRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is a simple Express server!");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log(`Connecting to: ${dbURI}`);

mongoose
  .connect(dbURI, {
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));
