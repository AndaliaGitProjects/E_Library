const ApiError = require("../utils/ApiError")
// global error handler middleware for express handler

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "fail"

  if (process.env.NODE_ENV == "development") errorForDev(err, res)
  else {
    if (err.name === "JsonWebTokenError") handleInvalidSig()
    if (err.name === "JsonWebTokenError") handleExpiredToken()
    errorForProduction(err, res)
  }
}

const errorForDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    stack: err.stack,
  })
}
const errorForProduction = (err, res) => {
  res.status(err.statusCode).json({
    message: err.msg,
    code: err.statusCode,
    status: err.status,
  })
}

const handleInvalidSig = (err, res) => {
  new ApiError("Invalid Token , please login again", 401)
}
const handleExpiredToken = (err, res) => {
  new ApiError("expired Token , please login again", 401)
}

module.exports = globalError
