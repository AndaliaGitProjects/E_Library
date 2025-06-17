const express = require("express")
const {
  getAutherValidator,
  createAutherValidator,
  updateAutherValidator,
  deleteAutherValidator,
} = require("../utils/autherValidator")
const {
  createAuther,
  getAuthers,
  getAuther,
  updateAuther,
  deleteSpecificAuther,
} = require("../controller/autherServices")

const { protect, allowedTo } = require("../controller/authServices")
const router = express.Router()

router
  .route("/")
  .post(protect, allowedTo("admin"), createAutherValidator, createAuther)
  .get(protect, getAuthers)
router
  .route("/:id")
  .get(protect, getAutherValidator, getAuther)
  .put(protect, allowedTo("admin"), updateAutherValidator, updateAuther)
  .delete(
    protect,
    allowedTo("admin"),
    deleteAutherValidator,
    deleteSpecificAuther
  )
// router.post()
// router.get()
module.exports = router
