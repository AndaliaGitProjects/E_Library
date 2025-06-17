const { check, validationResult } = require("express-validator")
const validatorMiddleware = require("../middleware/validator")

exports.getAutherValidator = [
  check("id").isMongoId().withMessage("Invalid MongoId"),
  validatorMiddleware,
]

exports.createAutherValidator = [
  check("firstName").notEmpty().withMessage("auther Firstname required"),
  check("lastName").notEmpty().withMessage("auther lastName required"),
  validatorMiddleware,
]

exports.updateAutherValidator = [
  check("id").isMongoId().withMessage("Invalid MongoId"),
  validatorMiddleware,
]
exports.deleteAutherValidator = [
  check("id").isMongoId().withMessage("Invalid MongoId"),
  validatorMiddleware,
]
