const mongoose = require("mongoose");

const UserLoggedInSchema = mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        token: { type: String },
        tokenExpiration: {type: Date}
    },
    { timestamps: true }
);

const UserLoggedIn = mongoose.model("user_logged_in", UserLoggedInSchema);
module.exports = UserLoggedIn;