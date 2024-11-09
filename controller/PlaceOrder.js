import OrderPlace from "../model/PlaceOrder.model.js";
import Cart from "../model/AddToCart.model.js";

export const PlaceOrder = async (req, res) => {
  const userId = req.user._id;
  const { deliveryAddress } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty, cannot place order" });
    }

    // Calculate total price from the user's cart items
    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order with cart items and other details
    const order = new OrderPlace({
      userId,
      items: cart.items, // Copy items from cart to the order
      totalPrice,
      deliveryAddress,
      orderTime: new Date(),
    });

    // Save the order and clear the cart
    await order.save();
    await Cart.updateOne({ userId }, { $set: { items: [] } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};
