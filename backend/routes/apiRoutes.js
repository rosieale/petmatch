const express = require("express")
const app = express()
const apiRoutes = require("./apiRoutes")

app.use("/apiRoutes", apiRoutes)

module.exports = app