const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
    {
        model: { type: String, require: true },
        name: { type: String, require: true },
        img: { type: String, require: true },
        price: { type: Number, require: true },
    },
    { timestamps: true }
);

const Profile = mongoose.model("profiles", ProfileSchema);
module.exports = Profile;