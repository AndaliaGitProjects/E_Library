const userModel = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const ErrorApi = require("../utils/ApiError")
const bcrypt = require("bcryptjs")
// @desc create user
// @route POST api/v1/user
// @access private(admin)
exports.createUser = asyncHandler(async (req, res) => {
  const auther = await userModel.create({ ...req.body })
  res.status(201).json({ data: auther })
})

// // @desc get list of useres
// // @route GET api/v1/user
// // @access admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  if (page < 0 || limit < 0) {
    return next(new ErrorApi(`UNVALID VALUE FOR PAGE OR LIMIT`, 500))
  }
  const users = await userModel.find({}).limit(limit).skip(skip)
  res.status(200).json({ page, result: users.length, data: users })
})

// // @desc get spesific auther
// // @route GET api/v1/auther/:id
// // @access public
// exports.getAuther = asyncHandler(async (req, res, next) => {
//   const { id } = req.params

//   // if (!mongoose.Types.ObjectId.isValid(id))
//   //   return next(new ErrorApi(`enter a valid mongoose objectId`, 400))
//   // res.status(400).json({ msg: "enter a valid mongoose objectId (NOT FOUND)" })
//   const auther = await autherModel.findById(id)
//   if (!auther) {
//     return next(new ErrorApi(`no auther with this id ${id}`, 404))
//     // res.status(404).json({ msg: `no auther with this id ${id}` })
//   } else res.status(200).json({ data: auther })
// })

// // @desc update spesific auther
// // @route PUT api/v1/auther/:id
// // @access private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      role: req.body.role,
    },
    { new: true }
  )
  if (!user) {
    return next(new ErrorApi(`no user with this id ${id}`, 404))

    // res.status(404).json({ msg: `no auther with this id ${id}` })
  } else res.status(200).json({ data: user })
})

exports.changeUserpassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordCA: Date.now(),
    },
    { new: true }
  )
  if (!user) {
    return next(new ErrorApi(`no user with this id ${id}`, 404))

    // res.status(404).json({ msg: `no auther with this id ${id}` })
  } else res.status(200).json({ data: user })
})

// // @desc delete spesific auther
// // @route delete api/v1/auther/:id
// // @access private
exports.deleteSpecificUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const user = await userModel.findByIdAndDelete(id)
  if (!user) {
    return next(new ErrorApi(`no user with this id ${id}`, 404))
  } else res.status(204).send()
})
