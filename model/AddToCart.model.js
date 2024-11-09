// models/Cart.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      name: String,
      image: String,
      price: Number,
      description: String,
      quantity: { 
        type: Number, 
        required: true 
      }
    }
  ],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Cart', cartSchema);
