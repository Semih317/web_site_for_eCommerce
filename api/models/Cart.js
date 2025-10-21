const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            productImg: { type: String, required: true },
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
        },
    ],
},
    { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);

