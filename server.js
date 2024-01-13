const express = require("express");
const mongoose = require("mongoose");

const ProductModel = require('./models/product');
const app = express();

// middleware
app.use(express.json());

// routes
app.get("/aadarsh", (req, res) => {
    res.send("my first api, i am aadarsh");
});

app.post("/product", async (req, res) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!product) {
            return res.status(404).json({ message: 'Cannot find any products with ID.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Cannot find any products with ID.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(8000, () => {
    console.log("node api is running");
});

mongoose.connect("mongodb://localhost:27017/NodeApi")
    .then(() => {
        console.log("connected");
    }).catch((error) => {
        console.log(error);
    });
