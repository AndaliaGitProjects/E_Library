const express = require("express")
const cors = require("cors")
const dotEnv = require("dotenv")
dotEnv.config({ path: "dev.env" })

const ApiError = require("./utils/ApiError")
const globalError = require("./middleware/errorMiddleware")

const dbc = require("./config/database")

const { middlewareUpoveRoute } = require("./middleware/basicMiddleWare")

// routes prefix
const testRoute = require("./routes/testRoutes")
const autherRoute = require("./routes/autherRoutes")
const publisherRoute = require("./routes/publisherRoutes")
const bookRoute = require("./routes/bookRoutes")
const userRoute = require("./routes/userRoutes")
const authRoute = require("./routes/authRoutes")
// include ur env path VAriable

dbc()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
middlewareUpoveRoute(app)

// mount routes
app.use("/api/v1/test", testRoute)
app.use("/api/v1/auther", autherRoute)
app.use("/api/v1/publisher", publisherRoute)
app.use("/api/v1/book", bookRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/auth", authRoute)
app.all("/{*any}", (req, res, next) => {
  // const err = new Error(`Route not Found ${req.originalUrl}`)
  // next(err.message)
  return next(new ApiError(`Route not Found ${req.originalUrl}`, 404))
})
// error global handler middleware
app.use(globalError)

const server = app.listen(process.env.PORT, () => {
  console.log(
    "\x1b[43m%s\x1b[0m",
    "Server Start At : http://localhost:8000",
    "\x1b[0m"
  )
})

// not express error handling
process.on("unhandledRejection", (err) => {
  console.log(
    "\x1b[41m%s\x1b[0m",
    "UnhandledRejection Errors::",
    err.name,
    " ",
    err.errmsg
  )
  server.close(() => {
    console.log("App shutdown")
    process.exit(1)
  })
})
