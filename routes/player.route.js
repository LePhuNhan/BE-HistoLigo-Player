import express from "express";
import {
  addPlayerProfile,
  getPlayerProfile,
  updatePlayerProfile,
} from "../controllers/playerProfile.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import middlewares from "../middlewares/player.middleware.js";
const playerRouter = express.Router();

playerRouter.route("/").post(tryCatch(addPlayerProfile));

playerRouter
  .route("/:id")
  .get(tryCatch(getPlayerProfile))
  // .get(middlewares.verifyJwt(),tryCatch(getPlayerProfile))
  .put(tryCatch(updatePlayerProfile));
export default playerRouter;
