const mongoose = require("mongoose");
const url =
  "mongodb+srv://nitinkdasu:VeleGS2LUpBl4UVD@cluster0.o2beo.mongodb.net/";
// const url = "mongodb://localhost:27017/";
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

connectDB();
// module.exports = connectDB;
