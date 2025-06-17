const mongoose = require("mongoose")

const autherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "fn required"],
    },
    lastName: {
      type: String,
      required: [true, "ln required"],
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
)
autherSchema.index({ firstName: 1, lastName: 1 }, { unique: true })
const autherModel = mongoose.model("Auther", autherSchema)
module.exports = autherModel
