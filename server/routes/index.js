const router = require("express").Router();
const productRoutes = require("./product/product");
const categoryRoutes = require("./product/category");
const cartRoutes = require("./cart/cart");


// product routes
router.use("/product", productRoutes);

// category routes
router.use("/category", categoryRoutes);

// cart routes
router.use("/cart", cartRoutes);

module.exports = router;
