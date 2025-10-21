const User = require("../models/User");
const UserLoggedIn = require("../models/UserLoggedIn");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const token = require("../tokenControl/token");
const Cart = require("../models/Cart");

dotenv.config();

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu e-mail adresiyle zaten bir kullanıcı mevcut!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// login
router.post("/login", async (req, res) => {
    //Üyelerde kontrolü
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: "Kullanıcı bulunamadı!" });
        }
        //Şifre kontrolü
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(403).json("Geçersiz şifre!");
        }
        //Kullanıcı giriş yapmış halde mi ve tokeni geçerli mi?
        const loggedUser = await UserLoggedIn.findOne({ email: req.body.email });
        if (loggedUser) {
            const now = new Date();
            if (loggedUser.tokenExpiration > now) {
                return res.status(402).json("Kullanıcı zaten giriş yapmış durumda!");
            } else {
                const token = jwt.sign(
                    { user_id: user._id, email: user.email, username: user.username },
                    process.env.JWT_KEY,
                    { expiresIn: "1d" }
                );

                loggedUser.token = token;
                loggedUser.tokenExpiration = new Date(Date.now() + 3600000);

                await loggedUser.save();
                return res.status(200).json(loggedUser);
            }
        }
        //Eğer giriş yapmamışsa
        const token = jwt.sign(
            { user_id: user._id, email: user.email, username: user.username },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );
        const newLoggedUser = new UserLoggedIn({
            _id: user._id,
            email: req.body.email,
            token: token,
            username: user.username,
            tokenExpiration: new Date(Date.now() + 3600000)
        });

        await newLoggedUser.save();
        res.status(200).json(newLoggedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/welcome", token, (req, res) => {
    res.status(200).send("Hoşgeldiniz");
})

//user logout
router.delete("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>" formatından token'ı çıkar
    if (!token) {
        return res.status(400).json("Token bulunamadı");
    }

    try {
        const result = await UserLoggedIn.findOneAndDelete({ token });
        if (result) {
            res.status(200).json("Çıkış Yapıldı");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete account
router.delete("/delete-account/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await User.findOneAndDelete({ _id: id });
        await UserLoggedIn.findOneAndDelete({ _id: id });
        await Cart.findOneAndDelete({ userId: id });
        res.status(200).json("Hesap Başarıyla Silindi!");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;