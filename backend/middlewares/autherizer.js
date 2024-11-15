import dotenv from 'dotenv';
dotenv.config({
    path: '../config.env',
});
import jwt from 'jsonwebtoken';

// Middleware function to verify the JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
