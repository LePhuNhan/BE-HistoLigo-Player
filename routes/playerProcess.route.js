import express from "express";
import {
  createPlayerProcess,
  getAllPlayerProcesses,
  getCombinedTopicsWithPlayerProgress,
  updatePlayerProcessById,
  deletePlayerProcessById,
  updatePlayerProcessWithPlayerId,
  saveTestsResult
} from "../controllers/playerProcess.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const playerProcessRouter = express.Router();

playerProcessRouter
  .route("/")
  .get(verifyToken, tryCatch(getAllPlayerProcesses))
  .post(verifyToken, tryCatch(createPlayerProcess));

playerProcessRouter
  .route("/combindedTopic")
  .get(verifyToken, tryCatch(getCombinedTopicsWithPlayerProgress))
  // .put(verifyToken, tryCatch(updatePlayerProcessWithPlayerId));
  .put(verifyToken, tryCatch(saveTestsResult));
playerProcessRouter
  .route("/:id")
  .put(tryCatch(updatePlayerProcessById))
  .delete(tryCatch(deletePlayerProcessById));

export default playerProcessRouter;
