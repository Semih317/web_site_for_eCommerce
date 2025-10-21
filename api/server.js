const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const port = 5000;

dotenv.config();

//Routes
const parquetRoute = require("./routes/parquet");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const panelRoute = require("./routes/panel");
const profileRoute = require("./routes/profile");
const cartRoutes = require('./routes/cartRoutes');
const morgan = require("morgan");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error
    }
}

//middlewares   
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/parquet", parquetRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/panel", panelRoute);
app.use("/api/profiles", profileRoute);
app.use("/api", cartRoutes);

app.listen(port, () => {
    connect();
    console.log(`Server running on port ${port}`);
}); 