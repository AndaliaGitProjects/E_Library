const { check, validationResult } = require("express-validator")
const validatorMiddleware = require("../middleware/validator")

exports.getBookValidator = [
  check("id").isMongoId().withMessage("Invalid Moongose Id"),
  validatorMiddleware,
]

exports.getBooksVaildator = [
  check("page")
    .isNumeric()
    .withMessage("Must be a number")
    .custom((value) => {
      if (Number(value) <= 0) {
        return true
      }
    })
    .withMessage("must be a positive number"),
  check("limit")
    .isNumeric()
    .withMessage("Must be a number")
    .custom((value) => {
      if (Number(value) <= 0) {
        return true
      }
    })
    .withMessage("must be a positive number"),
  ,
  validatorMiddleware,
]

exports.createBooksValidator = [
  check("title").notEmpty().withMessage("title required"),
  check("type").notEmpty().withMessage("type required"),
  check("price")
    .isNumeric()
    .withMessage("type should be a number")
    .notEmpty()
    .withMessage("type required"),
  check("pubId").isMongoId().withMessage("not valid mongo id"),
  check("autherId").isMongoId().withMessage("not valid mongo id"),
  validatorMiddleware,
]

exports.updateBookValidator = [
  check("id").isMongoId().withMessage("Invalid Moongose Id"),
  validatorMiddleware,
]
exports.deleteBookValidator = [
  check("id").isMongoId().withMessage("Invalid Moongose Id"),
  validatorMiddleware,
]

exports.getAutherBooksValidator = [
  check("autherId").isMongoId().withMessage("Invalid Moongose Id"),
  validatorMiddleware,
]
