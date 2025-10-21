const Panel = require("../models/Panel");
const express = require("express");
const router = express.Router();

//get all
router.get("/get-all-panel", async (req, res) => {
    try {
        const panels = await Panel.find();
        res.status(200).json(panels);
    } catch (error) {
        res.status(500).json(error);
    }
})

//create
router.post("/add-panel", async (req, res) => {
    try {
        const newPanel = new Panel(req.body);
        await newPanel.save();
        res.status(200).json("Panel added succesfuly")
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put("/update-panel", async (req, res) => {
    try {
        await Panel.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.status(200).json("Item updated succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete("/delete-panel", async (req, res) => {
    try {
        await Panel.findOneAndDelete({ _id: req.body.id });
        res.status(200).json("Item deleted succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;