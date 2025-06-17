const express = require("express")

const { signup, login, logout } = require("../controller/authServices")
const { signupValidator, loginValidator } = require("../utils/authValidator")

const router = express.Router()

router.route("/signup").post(signupValidator, signup)
router.route("/login").post(loginValidator, login)
// router.route("/logout").delete(logout)
module.exports = router
