import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Joi from "joi";
import { getErrorMessages } from "../utils/validation.util.js";
import { applyRequestLanguage } from "../utils/localization.util.js";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const validateLoginRequest = async (req, res, next) => {
  const __ = applyRequestLanguage(req);
  const schema = Joi.object({
    userName: Joi.string()
      .required()
      .messages({
        "any.required": __("validation.required", {
          field: __("model.player.userName"),
        }),
      }),
    password: Joi.string()
      .required()
      .messages({
        "any.required": __("validation.required", {
          field: __("model.player.password"),
        }),
      }),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: getErrorMessages(error) });
  }
};
