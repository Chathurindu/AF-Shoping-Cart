const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const productModel = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  quantity: {
    type: Number,
  },
  // sold: {
  //   type: Number,
  //   maxlength: 100,
  //   default: 0,
  // },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productModel);
