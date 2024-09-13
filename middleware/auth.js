const jwt = require("jsonwebtoken");
const User = require("../models/guest.model.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "qwertyuiop");
    // console.log(decode);

    const user = await User.findOne({ _id: decode._id });
    console.log("data from user model", user);

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
    // console.log(token);
  } catch (error) {
    res.status(401).send({ error: "please authenticate" });
  }
};
module.exports = auth;
