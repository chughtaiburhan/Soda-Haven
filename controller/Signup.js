import mongoose from "mongoose";
import User from "../model/User.model.js";
import bcryptjs from "bcryptjs";

export const Signup=async (req,res) => {

    const {name, email, password} = req.body;

    if(!password){
        res.status(400).json({
            msg:"password is required"
        });
    };
    try {
        const emailExist=await User.findOne({ email });
        if(emailExist){
            res.status(409).json({
                msg:"Email already exist"
            })
        }else{
            const hashedPassword= await bcryptjs.hash(password, 10);

            const newUser=new User({
                _id:new mongoose.Types.ObjectId,
                name,
                email,
                password:hashedPassword,
            });
            console.log(newUser);
            await newUser.save();
            res.status(200).json({
                msg:"User signup successfully!"
            })
        }

    } catch (error) {
        console.error("Error during signup, ", error);
        res.status(500).jsoN({
            error:" An error occured in signup "
        });
    };
};