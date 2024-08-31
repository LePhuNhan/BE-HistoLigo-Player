import express from "express";
import {
  createOrUpdatePlayerTest,
  deletePlayerTest,
  getPlayerTestById,
  getPlayerTestsByPlayerId,
  updatePlayerTest,
  getPlayerTests,
} from "../controllers/playerTest.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const PlayerTestRouter = express.Router();

PlayerTestRouter.route("/")
  .get(verifyToken, tryCatch(getPlayerTestsByPlayerId))
  .post(verifyToken, tryCatch(createOrUpdatePlayerTest));

PlayerTestRouter.route("/:id")
  .get(tryCatch(getPlayerTestById))
  .put(tryCatch(updatePlayerTest))
  .delete(tryCatch(deletePlayerTest));

export default PlayerTestRouter;
