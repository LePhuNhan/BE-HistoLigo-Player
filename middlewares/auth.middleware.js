import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to validate login request
export const validateLoginRequest = async (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.details[0].message });
  }
};
