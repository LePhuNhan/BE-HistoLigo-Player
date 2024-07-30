import { Router } from "express";
import userController from "../controllers/user.controller.js";
import middlewares from "../middlewares/player.middleware.js";
import { verifyToken, validateLoginRequest } from '../middlewares/auth.middleware.js';
const UserRouter = Router();

UserRouter.get(
  "/users/:id",
  middlewares.verifyJwt(),
  userController.getOneUser
);

UserRouter.post("/users", userController.createUser, middlewares.verifyJwt());
UserRouter.post("/login",validateLoginRequest, userController.login);
UserRouter.post("/logout", userController.logout);

export default UserRouter;
