const autherModel = require("../models/authorModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const ErrorApi = require("../utils/ApiError")
const mongoose = require("mongoose")
// exports.getAuthers = (req, res) => {
//   res.send("authers")
// }

// exports.createAuther = (req, res) => {
//   const firstName = req.body.firstName
//   const lastName = req.body.lastName
//   const newAuther = new autherModel({ firstName, lastName })
//   newAuther
//     .save()
//     .then((doc) => {
//       res.json(doc)
//     })
//     .catch((err) => {
//       res.send(err)
//     })
// }

// promiision  way
// exports.createAuther = (req, res) => {
//   const firstName = req.body.firstName
//   const lastName = req.body.lastName
//   autherModel
//     .create({
//       firstName,
//       lastName,
//       slug: slugify(firstName + " " + lastName),
//     })
//     .then((auther) => {
//       res.status(201).json({ data: auther })
//     })
//     .catch((err) => {
//       res.status(400).send({ status: 400, type: "Error on Create", err: err })
//     })
// }
// asyc way

// بهي الطريقة مافيي حدد الخطا يعني ممكن يكون في خطا بال تسميات او اي شي بال try
// exports.createAuther = async (req, res) => {
//   const firstName = req.body.firstName
//   const lastName = req.body.lastName

//   try {
//     const auther = await autherModel.create({
//       firstName,
//       lastName,
//       slug: slugify(firstName + " " + lastName),
//     })
//     res.status(201).json({ data: auther })
//   } catch (err) {
//     res.status(400).send({ status: 400, type: "Error on Create", err: err })
//   }
// }

// @desc create auther
// @route POST api/v1/auther
// @access private(admin)
exports.createAuther = asyncHandler(async (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  const auther = await autherModel.create({
    firstName,
    lastName,
    slug: slugify(firstName + " " + lastName),
  })
  res.status(201).json({ data: auther })
})

// @desc get list of authers
// @route GET api/v1/auther
// @access public
exports.getAuthers = asyncHandler(async (req, res, next) => {
  const firstName = req.query.fn || ""
  const lastName = req.query.ln || ""
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  if (page < 0 || limit < 0) {
    return next(new ErrorApi(`UNVALID VALUE FOR PAGE OR LIMIT`, 500))
  }
  const authers = await autherModel
    .find({
      firstName: { $regex: firstName, $options: "i" },
      lastName: { $regex: lastName, $options: "i" },
    })
    .limit(limit)
    .skip(skip)
  res.status(200).json({ page, result: authers.length, data: authers })
})

// @desc get spesific auther
// @route GET api/v1/auther/:id
// @access public
exports.getAuther = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return next(new ErrorApi(`enter a valid mongoose objectId`, 400))
  // res.status(400).json({ msg: "enter a valid mongoose objectId (NOT FOUND)" })
  const auther = await autherModel.findById(id)
  if (!auther) {
    return next(new ErrorApi(`no auther with this id ${id}`, 404))
    // res.status(404).json({ msg: `no auther with this id ${id}` })
  } else res.status(200).json({ data: auther })
})

// @desc update spesific auther
// @route PUT api/v1/auther/:id
// @access private
exports.updateAuther = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  // let { firstName, lastName } = req.body

  const autherU = await autherModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
  if (!autherU) {
    return next(new ErrorApi(`no auther with this id ${id}`, 404))

    // res.status(404).json({ msg: `no auther with this id ${id}` })
  } else res.status(200).json({ data: autherU })
})

// @desc delete spesific auther
// @route delete api/v1/auther/:id
// @access private
exports.deleteSpecificAuther = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const autherD = await autherModel.findByIdAndDelete(id)
  if (!autherD) {
    return next(new ErrorApi(`no auther with this id ${id}`, 404))
  } else res.status(204).send()
})
