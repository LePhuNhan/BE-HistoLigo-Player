import { Router } from "express";
import UserRouter from "./user.route.js";

const rootRouterV1 = Router();

rootRouterV1.use("", UserRouter);

export default rootRouterV1;
