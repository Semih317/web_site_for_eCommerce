const mongoose = require("mongoose");

const PanelSchema = mongoose.Schema(
    {
        model: { type: String, require: true },
        subModel: { type: String, require: true },
        name: { type: String, require: true },
        img: { type: String, require: true },
        price: { type: Number, require: true },
    },
    { timestamps: true }
);

const Panel = mongoose.model("panels", PanelSchema);
module.exports = Panel;