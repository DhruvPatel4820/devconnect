const mongoose = require("mongoose");
async function connectDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
module.exports = connectDb;
