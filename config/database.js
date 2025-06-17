const mongoose = require("mongoose")

const dbc = () => {
  mongoose.connect(process.env.DB_URI).then((sucssec) => {
    console.log(
      "\x1b[43m%s\x1b[0m",
      `Connection Done to DB: ${sucssec.connection.host} `,
      "\x1b[0m"
    )
  })
}
module.exports = dbc
