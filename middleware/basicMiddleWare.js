const morgan = require("morgan")
const express = require("express")
// middleware

function middlewareUpoveRoute(app) {
  // middleware
  // logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
    // const logger = (req, res, next) => {
    //   console.log(`${res.statusCode} ${req.method} ${req.url}`)
    //   next() // المتابعة إلى الميدلوير التالي
    // }
    // app.use(logger)
  }
  // text/html to json in body request
  app.use(express.json())

  // end middleware
}
function middlewareDownRoute(app) {
  // global error handler middleware for express handler
}

module.exports = { middlewareUpoveRoute, middlewareDownRoute }
