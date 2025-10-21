const mongoose = require("mongoose");

const ParquetSchema = mongoose.Schema(
    {
        model: { type: String, require: true },
        name: { type: String, require: true },
        img: { type: String, require: true },
        price: { type: Number, require: true },
    },
    { timestamps: true }
);

const Parquet = mongoose.model("parquets", ParquetSchema);
module.exports = Parquet;