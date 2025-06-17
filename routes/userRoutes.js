const express = require("express")

const {
  createUser,
  getUsers,
  updateUser,
  deleteSpecificUser,
  changeUserpassword,
} = require("../controller/userServices")
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
} = require("../utils/userValidator")

const { protect, allowedTo } = require("../controller/authServices")

const router = express.Router()

router
  .route("/")
  .post(protect, allowedTo("admin"), createUserValidator, createUser)
  .get(protect, allowedTo("admin"), getUsers)
router
  .route("/:id")
  .put(protect, allowedTo("admin"), updateUserValidator, updateUser)
  .delete(protect, allowedTo("admin"), deleteUserValidator, deleteSpecificUser)

router.put(
  "/cp/:id",
  protect,
  allowedTo("admin"),
  changePasswordValidator,
  changeUserpassword
)

module.exports = router
