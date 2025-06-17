const asyncHandler = require("express-async-handler")
const apiError = require("../utils/ApiError")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.signup = asyncHandler(async (req, res) => {
  const user = await userModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  })

  const token = jwt.sign({ userId: user._id }, "helloWorld", {
    expiresIn: "90d",
  })

  res.status(201).json({ data: user, token })
})

exports.login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ username: req.body.username })

  if (!user) return next(new apiError("incorrect username or password"), 401)
  if (!(await bcrypt.compare(req.body.password, user.password)))
    return next(new apiError("incorrect username or password"), 401)
  const token = jwt.sign({ userId: user._id }, "helloWorld", {
    expiresIn: "90d",
  })
  res.status(200).json({ data: user, token })
})

exports.protect = asyncHandler(async (req, res, next) => {
  // 1- check if token exist in header if exist get it
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1]
  if (!token) {
    return next(
      new apiError(
        "you are not login please login to get acsses to this route",
        401
      )
    )
  }
  // 2- verfiy token (valid token no change on it or not expired)
  const decoded = jwt.verify(token, "helloWorld")
  // 3- check if user exists
  const user = await userModel.findById(decoded.userId)
  if (!user)
    return next(new apiError("the user belong to this token is delete", 401))
  // 4- check if user change his password after token creadted
  if (user.passwordCA) {
    const passwordChangedTimeStamp = parseInt(
      user.passwordCA.getTime() / 1000,
      10
    )
    // password changed after token created
    if (passwordChangedTimeStamp > decoded.iat) {
      return next(
        new apiError(
          "User recently changed his password please login in again",
          401
        )
      )
    }
  }
  req.user = user
  next()
})

exports.allowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    console.log(req.user.role)
    if (!roles.includes(req.user.role))
      return next(new apiError("you are not allowed to access this route", 403))
    next()
  })
}
