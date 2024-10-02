import express from "express";
import {
  addPlayerProfile,
  getPlayerProfile,
  // updatePlayerProfile,
  updatePlayerProfileAndRank,
  getAllPlayersAndRank,
  getAllPlayersByRank,
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
  .get(verifyToken, tryCatch(getPlayerProfile))
  .put(verifyToken, tryCatch(updatePlayerProfileAndRank));

playerRouter
  .route("/rank")
  .get(tryCatch(getAllPlayersAndRank))
  // .put(verifyToken, tryCatch(updatePlayerProfile));

  playerRouter
  .route("/byRank")
  .get(tryCatch(getAllPlayersByRank));
export default playerRouter;
