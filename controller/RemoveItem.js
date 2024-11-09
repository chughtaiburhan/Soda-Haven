import Cart from "../model/AddToCart.model.js";

export const removeItem = async (req, res) => {
    const userId = req.user._id; // User ID from Auth middleware
    const { itemId } = req.params; // Get itemId from route parameters

    try {
        // Update the cart document by removing the specific item from the items array
        const result = await Cart.updateOne(
            { userId },
            { $pull: { items: { _id: itemId } } } // Remove item with the matching itemId
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Item not found in cart []" });
        };

        res.status(200).json({ message: "Item removed from cart successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error: error.message });
    };
};
