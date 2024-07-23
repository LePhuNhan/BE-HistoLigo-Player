import express from "express";
import {
  addPlayerProfile,
  getPlayerProfile,
  updatePlayerProfile,
} from "../controllers/playerProfile.controller.js";
import { tryCatch } from "../utils/tryCatch.middleware.js";

const playerRouter = express.Router();

playerRouter.route("/").post(tryCatch(addPlayerProfile));

playerRouter
  .route("/:id")
  .get(tryCatch(getPlayerProfile))
  .put(tryCatch(updatePlayerProfile));
export default playerRouter;
