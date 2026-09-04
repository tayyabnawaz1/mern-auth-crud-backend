const UserModel = require("../models/AuthUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// logic for signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    name: "",
    email: "",
    password: "",
  };
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exist , you can login",
      });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    return res.status(201).json({
      message: "signup sccessfully ! ",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Servcer Eroor",
      success: false,
    });
  }
};

// logic for login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    const errMsg = "Auth failed email or password is wrong";
    if (!existingUser) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const passEqual = await bcrypt.compare(password, existingUser.password);
    if (!passEqual) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        _id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
    return res.status(200).json({
      message: "Login Success !",
      success: true,
      token: jwtToken,
      name: existingUser.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Servcer Eroor",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
