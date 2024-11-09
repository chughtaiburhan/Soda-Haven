import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    images:String,
    description:String
});

export default mongoose.model("Product", productSchema);