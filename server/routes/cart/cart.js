const express = require("express");
const cartRoutes = express.Router();

let Cart = require("../../models/cart/cart");

cartRoutes.route("/add").post(function (req, res) {
  const quantity = req.body.product.quantity;
  const item = req.body.product._id;
  const user = req.body.user;

  const cart = new Cart({
    quantity,
    item,
    user,
  });

  cart.save((err, cart) => {
    if (err) {
      return res.status(422).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    Cart.findById(cart._id)
      .populate("item", "name price slug")
      .exec((err, cart) => {
        if (err) {
          return res.status(422).json({
            error: "Your request could not be processed. Please try again.",
          });
        }

        res.status(200).json({
          success: true,
          message: `Item has been added to your shopping cart!`,
          cart: cart,
        });
      });
  });
});

cartRoutes.route("/").get(function (req, res) {
  Cart.find(function (err, cart) {
    if (err) {
      console.log(err);
    } else {
      res.json(cart);
    }
  });
});

cartRoutes.route("/delete/:id").get(function (req, res) {
  Cart.findByIdAndRemove({ _id: req.params.id }, function (er, cart) {
    if (err) res.json(err);
    else res.json("Removed successfully");
  });
});

module.exports = cartRoutes;
