const route = require("express").Router();
const { signup, login } = require("../controllers/AuthController");
const { validateSignup, validateLogin } = require("../middlewares/Auth");

route.post("/signup", validateSignup, signup);
route.post("/login", validateLogin, login);

module.exports = route;
