import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router"

const app = express();

app.use(cors({
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const MONGO_URL = process.env.mongodb_uri!;

const PORT = 8000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB error: ", err);
})

app.use("/", router())