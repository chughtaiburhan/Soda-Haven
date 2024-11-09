import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

export default mongoose.model("User", userSchema);