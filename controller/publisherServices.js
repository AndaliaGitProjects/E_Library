const publisherModel = require("../models/publisherModel")
const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
// exports.createPublisher = async (req, res) => {
//   const name = req.body.name
//   const city = req.body.city

//   try {
//     const publisher = await publisherModel.create({
//       name,
//       city,
//       slug: slugify(name),
//     })
//     res.status(201).json({ data: publisher })
//   } catch (err) {
//     res.status(400).send({ status: 400, type: "Error on Create", err })
//   }
// }

// @desc get list of publisher
// @route GET api/v1/publisher
// @access public
exports.getPublishers = asyncHandler(async (req, res, next) => {
  const name = req.query.name || ""
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  if (page < 0 || limit < 0) {
    return next(new ErrorApi(`UNVALID VALUE FOR PAGE OR LIMIT`, 500))
  }
  const publisher = await publisherModel
    .find({
      name: { $regex: name, $options: "i" },
    })
    .limit(limit)
    .skip(skip)
  res.status(200).json({ page, result: publisher.length, data: publisher })
})

// @desc create publisher
// @route POST api/v1/publisher
// @access private(admin)
exports.createBublisher = asyncHandler(async (req, res) => {
  const name = req.body.name
  const city = req.body.city || ""
  const publisher = await publisherModel.create({
    name,
    city,
    slug: slugify(name),
  })
  res.status(201).json({ data: publisher })
})
