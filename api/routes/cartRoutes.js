// api/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Sepeti Getir
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Sepete Ürün Ekle
router.post('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity, productImg, productName, productPrice } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, productImg, productName, productPrice });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Sepetten ürün sil
router.delete('/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId !== productId);

        await cart.save();

        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ürün adedi güncelleme
router.put('/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Sepet bulunamadı' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Ürün sepet içinde bulunamadı' });
        }

        cart.items[itemIndex].quantity = quantity;

        await cart.save();

        return res.status(200).json({ message: 'Ürün adeti güncellendi', cart });
    } catch (error) {
        console.error('Ürün adeti güncellenirken hata:', error);
        return res.status(500).json({ message: 'Ürün adeti güncellenirken hata oluştu' });
    }
});

module.exports = router;