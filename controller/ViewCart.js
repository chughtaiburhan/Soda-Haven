import Cart from "../model/AddToCart.model.js";

export const ViewCart = async (req,res) => {
    try {
        const cart = await Cart.findOne({userId: req.user._id})
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        res.json( cart.items || [] );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
      }
}