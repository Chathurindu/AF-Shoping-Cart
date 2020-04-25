const mongoose = require("mongoose");

const discountModel = mongoose.Schema(
  {
    title: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rate: {
      type: Number,
    },
  },
);

module.exports = mongoose.model("Discount", discountModel);
