import { Router } from "express";
import UserRouter from "./player.route.js";
import loadRequestContentLanguage from "../middlewares/localization.middleware.js"
const rootRouterV1 = Router();

rootRouterV1.use("", loadRequestContentLanguage, UserRouter);

export default rootRouterV1;
