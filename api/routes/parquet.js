const Parquet = require("../models/Parquet");
const express = require("express");
const router = express.Router();

//get all
router.get("/get-all-parquet", async (req, res) => {
    try {
        const parquets = await Parquet.find();
        res.status(200).json(parquets);
    } catch (error) {
        res.status(500).json(error);
    }
})

//create
router.post("/add-parquet", async (req, res) => {
    try {
        const newParquet = new Parquet(req.body);
        await newParquet.save();
        res.status(200).json("Parquet added succesfuly")
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put("/update-parquet", async (req, res) => {
    try {
        await Parquet.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.status(200).json("Item updated succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete("/delete-parquet", async (req, res) => {
    try {
        await Parquet.findOneAndDelete({ _id: req.body.id });
        res.status(200).json("Item deleted succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;