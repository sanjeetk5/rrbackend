const User = require("../models/User");

// Add favorite
const addFavorite = async (req, res) => {
  try {
    const productId = req.params.productId;

    const user = await User.findById(req.user._id);

    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove favorite
const removeFavorite = async (req, res) => {
  try {
    const productId = req.params.productId;

    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter((id) => id.toString() !== productId);

    await user.save();

    res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
