const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide value for text field."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
