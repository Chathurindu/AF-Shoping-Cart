const mongoose = require("mongoose");

const cartModel = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  // amount: {
  //   type: Number,
  //   default: 0,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", cartModel);
