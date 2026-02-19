const express = require("express");
const protect = require("../middleware/authMiddleware");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/:productId", protect, addFavorite);
router.delete("/:productId", protect, removeFavorite);

module.exports = router;
