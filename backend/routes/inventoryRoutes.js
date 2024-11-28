const express = require("express");
const Product = require("../models/product");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new product (Admin only)
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: "Error adding product", details: err });
  }
});

// Edit a product (Admin only)
router.put("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: "Error updating product", details: err });
  }
});

// Delete a product (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product", details: err });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products", details: err });
  }
});

module.exports = router;
