const express = require("express")
const { protect, allowedTo } = require("../controller/authServices")

const {
  getPublishers,
  createBublisher,
} = require("../controller/publisherServices")
const router = express.Router()

router
  .route("/")
  .get(getPublishers)
  .post(protect, allowedTo("admin"), createBublisher)

// router.post()
// router.get()
module.exports = router
