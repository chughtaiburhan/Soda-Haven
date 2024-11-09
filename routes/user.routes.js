import express from "express";
import { Signup } from "../controller/Signup.js";
import { Login } from "../controller/Login.js";
import { Productroute } from "../controller/Productroute.js";
import { AddToCart } from "../controller/AddToCart.js";
import { Auth } from "../Authentication/auth.js";
import { ViewCart } from "../controller/ViewCart.js";
import { removeItem } from "../controller/RemoveItem.js";
import { PlaceOrder } from "../controller/PlaceOrder.js";
import { ViewOrder } from "../controller/ViewOrderStatus.js";

const router=express.Router();

// User Routes
router.post('/signup', Signup);
router.post('/login', Login);

// Product Routes
router.get('/', Productroute);
router.post('/addToCart', Auth, AddToCart);
router.get('/viewCart', Auth, ViewCart);

// Delete Product Route
router.delete('/removeItem/:itemId', Auth, removeItem);

// Place Order Route
router.post('/placeOrder', Auth, PlaceOrder); 

// View Order Route
router.get('/viewOrder/:orderId', Auth, ViewOrder);

export default router; 