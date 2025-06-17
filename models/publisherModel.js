const mongoose = require("mongoose")

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
    },
    city: {
      type: String,
    },

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
)

const publisherModel = mongoose.model("Publisher", publisherSchema)
module.exports = publisherModel
