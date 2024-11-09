import Product from "../model/Product.model.js";

export const Productroute=async (req,res) => {
    try {
        const product=await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json(error);
    }
}