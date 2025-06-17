const mongoose = require("mongoose")

const testSc = new mongoose.Schema({
  name: String,
})

const mtest = mongoose.model("Test", testSc)

module.exports = mtest
