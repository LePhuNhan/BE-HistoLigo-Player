import { Router } from "express";
import userController from "../controllers/player.controller.js";
import middlewares from "../middlewares/player.middleware.js";

const UserRouter = Router();

UserRouter.get(
  "/users/:id",
  middlewares.verifyJwt(),
  userController.getOneUser
);

UserRouter.post("/users", userController.createUser, middlewares.verifyJwt());
UserRouter.post("/login", userController.login, middlewares.verifyJwt);
UserRouter.post("/logout", userController.logout);

export default UserRouter;
