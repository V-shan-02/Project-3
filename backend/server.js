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

//routes

server.get("/", (request, response) => {
  response.send("Live");
});

server.get("/products", async (request, response) => {
  await Product.find()
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.json(error);
    });
});

server.post("/products", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const product = new Product({
    productName,
    brand,
    image,
    price,
  });
  await product
    .save()
    .then((res) => {
      response.status(201).json({ message: "Product added successfully" });
    })
    .catch((error) => {
      response.status(404).json(error.message);
    });
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  await Product.findByIdAndDelete(id)
    .then((res) => {
      response.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      response.status(404).json(error.message);
    });
});
