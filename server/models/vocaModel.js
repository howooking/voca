const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vocaSchema = new Schema(
  {
    eng: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    kor: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Voca", vocaSchema);
