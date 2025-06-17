const mongoose = require("mongoose")
const slugify = require("slugify")
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher", // This creates a reference to the Publisher model
      required: true,
    },
    autherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", // This creates a reference to the Author model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
)

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
