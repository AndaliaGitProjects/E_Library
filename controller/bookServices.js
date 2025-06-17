const bookModel = require("../models/bookModel")
const asyncHandler = require("express-async-handler") // Import express-async-handler
const slugify = require("slugify")
const mongoose = require("mongoose")
const ApiError = require("../utils/ApiError")

// @desc create Book
// @route POST api/v1/book/
// @access private
exports.createBook = asyncHandler(async (req, res) => {
  const { title, type, price, pubId, autherId } = req.body

  const savedBook = await bookModel.create({
    title,
    type,
    price,
    pubId,
    autherId,
    slug: slugify(title),
  })

  res.status(201).json({
    message: "Book created successfully!",
    data: savedBook,
  })
})

// @desc get Books
// @route GET api/v1/book/
// @access public
exports.getBooks = asyncHandler(async (req, res) => {
  title = req.query.title || ""
  page = req.query.page * 1 || 1
  limit = req.query.limit * 1 || 5
  skip = (page - 1) * limit

  const books = await bookModel
    .find({ title: { $regex: title, $options: "i" } })
    .skip(skip)
    .limit(limit)
  if (!books) {
    return next(new ApiError(`no books yet `, 404))
  }
  res.status(200).json({ result: books.length, page, limit, data: books })
})

// @desc get spesific book
// @route GET api/v1/book/:id
// @access public
exports.getBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const book = await bookModel.findById(id)

  if (!book) {
    return next(new ApiError(`no book for this id :${id} `, 404))
  }

  res.status(200).json({
    message: `Successfully retrieved book for  ID: ${id}`,
    book,
  })
})

// @desc update spesific book
// @route PUT api/v1/book/:id
// @access private
exports.updateBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const Book = await bookModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
  if (!Book) {
    return next(new ErrorApi(`no Book with this id ${id}`, 404))
  } else res.status(200).json({ data: Book })
})

// @desc delete spesific book
// @route delete api/v1/book/:id
// @access private
exports.deleteSpecificBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const autherD = await bookModel.findByIdAndDelete(id)
  if (!autherD) {
    return next(new ErrorApi(`no auther with this id ${id}`, 404))
  } else res.status(204).send()
})

// @desc get  books for one auther
// @route delete api/v1/book/:Autherid/auther
// @access private
exports.getBooksByAuthor = async (req, res) => {
  // 1. Extract the authorId (which is an ObjectId string) from the request parameters
  let { autherId } = req.params
  // autherId = new mongoose.Types.ObjectId(autherId)
  // if (!mongoose.Types.ObjectId.isValid(autherId)) {
  //   res.status(400)
  //   throw new Error(
  //     "Invalid AuthorId format. Must be a valid MongoDB ObjectId."
  //   )
  // }

  const books = await bookModel.find({ autherId })
  if (books.length === 0) {
    return res
      .status(404)
      .json({ message: `No books found for author with ID: ${autherId}` })
  }
  res.status(200).json({
    message: `Successfully retrieved books for author ID: ${autherId}`,
    data: books,
  })
}
