import express from "express";
import {
  addPlayerProfile,
  getPlayerProfile,
  // updatePlayerProfile,
  updatePlayerProfileAndRank,
  getAllPlayersAndRank,
} from "../controllers/playerProfile.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import {
  verifyToken,
  validateLoginRequest,
} from "../middlewares/auth.middleware.js";
const playerRouter = express.Router();

playerRouter
  .route("/")
  .post(tryCatch(addPlayerProfile))
  .get(tryCatch(getAllPlayersAndRank))
  .put(verifyToken, tryCatch(updatePlayerProfileAndRank));

playerRouter
  .route("/:id")
  .get(verifyToken, tryCatch(getPlayerProfile))
  // .put(verifyToken, tryCatch(updatePlayerProfile));
  
export default playerRouter;
