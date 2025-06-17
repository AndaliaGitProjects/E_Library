const { check, validationResult, param } = require("express-validator")
const validatorMiddleware = require("../middleware/validator")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("user Firstname required"),
  check("lastName").notEmpty().withMessage("user lastName required"),

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

  check("passwordC").notEmpty().withMessage("password confirm required"),

  check("username")
    .notEmpty()
    .withMessage("username required")
    .custom(async (val) => {
      const check = await userModel.findOne({ username: val }).then((user) => {
        if (user) return Promise.reject(new Error("username already excisist"))
      })
    }),
  check("role").optional(),
  validatorMiddleware,
]

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("not valid mongo id"),
  check("username")
    .notEmpty()
    .withMessage("username required")
    .custom(async (val) => {
      const check = await userModel.findOne({ username: val }).then((user) => {
        if (user) return Promise.reject(new Error("username already excisist"))
      })
    }),
  validatorMiddleware,
]
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("not valid mongo id"),
  validatorMiddleware,
]

exports.changePasswordValidator = [
  param("id").isMongoId().withMessage("not valid mongo id"),

  check("currentPassword").notEmpty().withMessage("enter ur current password"),
  check("passwordC")
    .notEmpty()
    .withMessage("you must enter the pasword confirm"),
  check("password")
    .notEmpty()
    .withMessage("u must enter new password")
    .custom(async (val, { req }) => {
      const user = await userModel.findById(req.params.id)
      if (!user) {
        throw new Error("no user for thid id")
      }
      const currentpasswords = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      )
      console.log("sacs")
      if (!currentpasswords) throw new Error("incoreect current password")
    })
    .custom(async (val, { req }) => {
      if (req.body.password != req.body.passwordC)
        throw new Error("no match in passwords")
      return true
    }),

  validatorMiddleware,
]
