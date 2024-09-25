import express from "express";
import userController from "../controllers/player.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const playerRouter = express.Router();

playerRouter.post("/register", userController.createUser);
playerRouter.post("/login", userController.login);
playerRouter.post("/logout", verifyToken, userController.logout);
playerRouter.get("/:id", verifyToken, userController.getOneUser);

export default playerRouter;