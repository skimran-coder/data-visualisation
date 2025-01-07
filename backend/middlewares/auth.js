const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }

    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
        error,
      });
    }

    console.log(decodedToken);

    const user = await User.findOne({ email: decodedToken.email });
    user.password = undefined;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying user",
      error,
    });
  }
};

module.exports = auth;
