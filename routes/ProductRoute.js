const ProductController = require("../controllers/ProductController");
const {
  createProductvalidate,
  updateProductvalidate,
} = require("../middlewares/productMW");
const verifyToken = require("../middlewares/VerifyToken");

const route = require("express").Router();

route.post(
  "/products",
  verifyToken,
  createProductvalidate,
  ProductController.createProducts,
);
route.get("/products", verifyToken, ProductController.getProducts);
route.get("/products/:id", verifyToken, ProductController.getProductById);
route.put(
  "/products/:id",
  verifyToken,
  updateProductvalidate,
  ProductController.updateProduct,
);
route.delete("/products/:id", verifyToken, ProductController.deleteProduct);

module.exports = route;
