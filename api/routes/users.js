const User = require("../models/User");
const express = require("express");
const UserLoggedIn = require("../models/UserLoggedIn");
const router = express.Router();
const bcrypt = require("bcryptjs");

//get all
router.get("/get-all-user", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get a user
router.get("/get-user", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>" formatından token'ı çıkar
    if (!token) {
        return res.status(400).json("Token bulunamadı");
    }
    try {
        const user = await UserLoggedIn.findOne({ token });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update user
router.put("/update-user", async (req, res) => {
    const { _id, username, email, password } = req.body;
    try {
        // Email ve _id ile kullanıcı sorgulama
        const existingUserByEmail = await User.findOne({ email });
        const existingUserById = await User.findOne({ _id });

        if (existingUserByEmail && existingUserByEmail._id.toString() !== _id) {
            return res.status(400).json("Email Adresi ile Kayıtlı Kullanıcı Bulunmakta");
        }

        if (!existingUserById) {
            return res.status(404).json("Kullanıcı bulunamadı");
        }

        // Kullanıcı güncelleme
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate(
            { _id },
            { username, email, password: hashedPassword },
        );

        await UserLoggedIn.findOneAndUpdate(
            { _id },
            { username, email },
        );

        res.status(200).json({
            message: "Kullanıcı Güncellendi",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası", error });
    }
});

module.exports = router;