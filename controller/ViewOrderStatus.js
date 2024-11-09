import PlaceOrder from "../model/PlaceOrder.model.js"

export const ViewOrder = async (req, res) => {
    const orderId = req.params.orderId; // Retrieve orderId from req.params
    const userId = req.user._id;        // Retrieve userId from authenticated user's info

    try {
        // Find the order by ID and ensure it belongs to the authenticated user
        const order = await PlaceOrder.findOne({ _id: orderId, userId: userId })
            .populate("items.productId", "name price") // Populate product details if necessary

        if (!order) {
            return res.status(404).json({ message: "Order not found or you don't have access to this order." });
        }

        // Return the order details
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "An error occurred while fetching the order details." });
    }
};