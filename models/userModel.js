// User (Iid, Username, password, FName, LName)
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "fn required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "ln required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "passwordrequired"],
      minlength: [6, "too short password"],
    },
    username: {
      type: String,
      trim: true,
      require: [true, "name required"],
      unique: true,
    },
    role: {
      type: String,

      default: "user",
    },
    active: {
      type: Boolean,
      defualt: true,
    },
    passwordCA: {
      type: Date,
    },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  // hashin password
  this.password = await bcrypt.hash(this.password, 12)
  next()
})
const userModel = mongoose.model("User", UserSchema)
module.exports = userModel
