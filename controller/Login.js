import bcryptjs from "bcryptjs";
import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const Login = async (req,res) => {
    const {email,password}=req.body;
    try {
        const emailExist=await User.findOne({ email });
        if (!emailExist){
            res.status(400).json({
                msg:"User not found"
            });
        }
        const isMatch= await bcryptjs.compare(password, emailExist.password);
        if(!isMatch){
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        };

        const user=emailExist;
        // Create JWT token
        const token =jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "24h",
            }
        );
        res.status(200).json({
            msg:"User Login Successfully! ",
            token,
            auth:true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            }
        })
    } catch (error) {
        console.error("Login error ", error);
        res.status(500).json({
            msg:"Internal server error"
        })
    };
}