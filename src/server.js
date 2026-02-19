const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./config/db")

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect


// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Micro Marketplace API Running...");
});


app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("Connected to db");
    } catch (err) {
      console.log(err);
      console.log("Error connecting in database");
    }


    console.log(`Server running on http://localhost:${process.env.PORT}`);
  
    //console.log(`Server is running at port ${process.env.port}`);
  });

