const { check, validationResult, param } = require("express-validator")
const validatorMiddleware = require("../middleware/validator")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signupValidator = [
  check("firstName").notEmpty().withMessage("user Firstname required"),
  check("lastName").notEmpty().withMessage("user lastName required"),
  check("username")
    .notEmpty()
    .withMessage("username required")
    .custom(async (val) => {
      const check = await userModel.findOne({ username: val }).then((user) => {
        if (user) return Promise.reject(new Error("username already excisist"))
      })
    }),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password min length is 6")
    .isLength({ max: 12 })
    .withMessage("password max length is 12")
    .custom((val, { req }) => {
      if (val !== req.body.passwordC)
        throw new Error("password conformation not correct")
      return true
    }),
  validatorMiddleware,
]

exports.loginValidator = [
  check("username").notEmpty().withMessage("username required"),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password min length is 6")
    .isLength({ max: 12 })
    .withMessage("password max length is 12"),

  validatorMiddleware,
]
