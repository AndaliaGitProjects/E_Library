const testM = require("../models/testModel")

exports.getTest = (req, res) => {
  const name = req.body.name
  const newtest = new testM({ name })
  newtest
    .save()
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      res.send(err)
    })
}
