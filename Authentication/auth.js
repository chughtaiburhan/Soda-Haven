import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
 
export const Auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication failed" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId }; // Assuming `decoded` contains user information, including `userId`
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

