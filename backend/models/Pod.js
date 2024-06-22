const mongoose = require("mongoose");

const podSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

const Pod = mongoose.model("Pod", podSchema);

module.exports = Pod;
