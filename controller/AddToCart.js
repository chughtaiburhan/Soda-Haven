// controller/AddToCart.js
import CartItem from "../model/AddToCart.model.js";
import Productmodel from "../model/Product.model.js";

export const AddToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Retrieve userId from req.user

  try {
    const product = await Productmodel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = await CartItem.create({
        userId, // Include userId here
        items: [
          {
            productId: product._id,
            name: product.name,
            image: product.images, // Assuming "images" is the correct field name
            price: product.price,
            description: product.description,
            quantity,
          },
        ],
      });
      
    res.status(201).json({ message: 'Item added to cart successfully', cartItem });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
};
