const express = require("express")
const {
  getBookValidator,
  getBooksVaildator,
  createBooksValidator,
  updateBookValidator,
  deleteBookValidator,
  getAutherBooksValidator,
} = require("../utils/bookValidator")
const { protect, allowedTo } = require("../controller/authServices")

const {
  getBooksByAuthor,
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteSpecificBook,
} = require("../controller/bookServices")
const router = express.Router()

router
  .route("/")
  .post(protect, allowedTo("admin"), createBooksValidator, createBook)
  .get(protect, getBooks)

router
  .route("/:autherId/auther")
  .get(protect, getAutherBooksValidator, getBooksByAuthor)
router
  .route("/:id")
  .get(protect, getBookValidator, getBook)
  .put(protect, allowedTo("admin"), updateBookValidator, updateBook)
  .delete(protect, allowedTo("admin"), deleteBookValidator, deleteSpecificBook)

// router.post()
// router.get()
module.exports = router
