const express = require("express")

const { getTest } = require("../controller/testServices")
const router = express.Router()

router.get("/", getTest)

module.exports = router
