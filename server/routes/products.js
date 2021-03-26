const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// TODO: It would be good to check the
// schema
router.route("/add").post((req, res) => {
  // checking that there is a request body
  if (!req.body) {
    return res.status(400).send("Request Body is missing");
  }
  const brand = req.body.brand;
  const description = req.body.description;
  const label = req.body.label;
  const name = req.body.name;
  const path = req.body.path;
  const price = req.body.price;
  const sizes = req.body.sizes;
  const src = req.body.src;

  // This should check the schema
  const newProduct = new Product({
    brand,
    description,
    label,
    name,
    path,
    price,
    sizes,
    src,
  });

  newProduct
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).json("Product added!");
    })
    .catch((err) => res.status(500).json(err));
});

/*
router.route("/addmany").post((req, res) => {
  const products = req.body.products;
  var error = false;

  products.map((product) => {
    const brand = product.brand;
    const description = product.description;
    const label = product.label;
    const name = product.name;
    const path = product.path;
    const price = product.price;
    const sizes = product.sizes;
    const src = product.src;

    const newProduct = new Product({
      brand,
      description,
      label,
      name,
      path,
      price,
      sizes,
      src,
    });
    newProduct.save().catch((err) => (error = true));
  });
  if (error) {
    res.status(400);
  } else res.json("ProductSS added!");
});*/

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.brand = req.body.brand;
      product.description = req.body.description;
      product.label = req.body.label;
      product.name = req.body.name;
      product.path = req.body.path;
      product.sizes = req.body.sizes;
      product.src = req.body.src;

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
