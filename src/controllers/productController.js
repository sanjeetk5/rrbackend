const Product = require("../models/Product");

// Create product
const createProduct = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      image
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products (search + pagination)
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      total,
      page,
      limit,
      products
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, description, image },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
