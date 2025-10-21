const Profile = require("../models/Profile");
const express = require("express");
const router = express.Router();

//get all
router.get("/get-all-profile", async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json(error);
    }
})

//create
router.post("/add-profile", async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(200).json("Profile added succesfuly")
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put("/update-profile", async (req, res) => {
    try {
        await Profile.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.status(200).json("Item updated succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete("/delete-profile", async (req, res) => {
    try {
        await Profile.findOneAndDelete({ _id: req.body.id });
        res.status(200).json("Item deleted succesfuly");
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;