const router = require("express").Router(); // import express router
let Product = require("../../models/product/product");
let Category = require("../../models/product/category");

// get products using get request and return json object
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.get("/item/:slug", (req, res) => {
  const slug = req.params.slug;

  Product.findOne({ slug: slug })
    .populate("brand", "name")
    .exec((err, product) => {
      if (err) {
        return res.status(422).json({
          error: "Your request could not be processed. Please try again.",
        });
      }
      res.status(200).json({
        product: product,
      });
    });
});

router.get("/list/category/:slug", (req, res) => {
  const slug = req.params.slug;

  Category.findOne({ slug: slug }, "products -_id")
    .populate("products")
    .exec((err, data) => {
      if (err) {
        return res.status(422).json({
          error: "Your request could not be processed. Please try again.",
        });
      }

      res.status(200).json({
        products: data.products,
      });
    });
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;

  if (!description || !name) {
    return res
      .status(422)
      .json({ error: "You must enter description & name." });
  }

  if (!quantity) {
    return res.status(422).json({ error: "You must enter quantity." });
  }

  if (!price) {
    return res.status(422).json({ error: "You must enter price." });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    quantity,
  });

  newProduct
    .save()
    .then(() => res.json("*** Added new product"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// get product using id
router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete product using id
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("*** Product deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// update product using id
router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;

      product
        .save()
        .then(() => res.json("*** Product updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

router.get("/list/select", (req, res) => {
  Product.find({}, "name", (err, data) => {
    if (err) {
      return res.status(422).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    res.status(200).json({
      products: data,
    });
  });
});

module.exports = router;
