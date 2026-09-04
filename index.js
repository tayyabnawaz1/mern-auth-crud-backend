const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/AuthRoute");
const ProductRoute = require("./routes/ProductRoute");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7979;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/authdatabase";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully ! ");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed !");
  });

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/mern_auth", authRoute);
app.use("/auth_mern", ProductRoute);

app.listen(PORT, () => {
  console.log(`Server Starting on the PORT:${PORT}`);
});
