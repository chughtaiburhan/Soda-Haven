// models/PlaceOrder.model.js
import mongoose from "mongoose";

const placeOrderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  deliveryAddress: { 
    type: String, 
    required: true 
  },
  orderTime: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("PlaceOrder", placeOrderSchema);
