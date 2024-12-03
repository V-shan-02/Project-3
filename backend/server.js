const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
require("dotenv").config();
const { DB_URI } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id: crypto.randomUUID(),
  });

  try {
    await product
      .save()
      .then((result) => response.status(201).send("Product added"));
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) =>
      response.status(200).send("Product deleted")
    );
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) => response.status(200).send("Product updated"));
  } catch (error) {
    console.log(error.message);
  }
});
