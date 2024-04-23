import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

//connecting to database
mongoose.connect("mongodb+srv://Shubham:Shubham@cluster0.hr0kimb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to Database");
}).catch((e) => {
    console.log(e)
})


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//erorr
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
})

app.listen(5000, () => {
    console.log("Server is running....");
})