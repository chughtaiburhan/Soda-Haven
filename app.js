import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import UserRoute from "./routes/user.routes.js";

dotenv.config();

const port=process.env.PORT;
const MONGODB_URL=process.env.MONGODB_URL;

const app=express();

// Mongodb Connection
mongoose.connect(MONGODB_URL)

// Middleware
app.use(express.json());
app.use(helmet());


// Routes
app.use('/', UserRoute);
app.use('/user', UserRoute);



app.use('*', (req,res)=>{
    res.status(400).json({
        msg:"Bad request"
    })
})

export default app;
export {port};