const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
require("dotenv").config();
const { DB_URI, JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

// Fetch all products
server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// Add product
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

// Delete product by ID
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

// Fetch single product by ID
server.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(`Fetching product with ID: ${productId}`); // Debugging

  try {
    const product = await Product.findById(productId); // Fetch product by ID
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product); // Send product data as JSON
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error fetching product");
  }
});

// Update product by ID
server.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const { productName, brand, image, price } = req.body; // Extract the updated data

  try {
    const product = await Product.findById(productId); // Find the product by ID

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Update the product fields
    product.productName = productName || product.productName; // Use existing value if not updated
    product.brand = brand || product.brand;
    product.image = image || product.image;
    product.price = price || product.price;

    // Save the updated product
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
});

// Create user
server.post("/create-user", async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser
      .save()
      .then((result) =>
        response.send(`Congrats! created username ${username}`)
      );
  } catch (error) {
    response.send(`Cannot add user: error ${error.message}`);
  }
});

// Login user
server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const jwtToken = jwt.sign({ id: username }, JWT_SECRET);

  const user = await User.findOne({ username }).then((user) => {
    if (!user) {
      return response.send({ message: "Username not found" });
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return response.send({ message: "An error occurred" });
      }
      if (result) {
        return response.send({
          message: "User authenticated",
          token: jwtToken,
        });
      } else {
        return response.send("Incorrect username or password");
      }
    });
  });
});

module.exports = server;
