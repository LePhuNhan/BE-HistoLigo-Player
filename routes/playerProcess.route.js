import express from "express";
import {
  createPlayerProcess,
  getAllPlayerProcesses,
  getPlayerProcessById,
  updatePlayerProcessById,
  deletePlayerProcessById,
} from "../controllers/playerProcess.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import {
  verifyToken
} from "../middlewares/auth.middleware.js";

const playerProcessRouter = express.Router();

playerProcessRouter
  .route("/")
  .get(verifyToken,tryCatch(getAllPlayerProcesses))
  .post(tryCatch(createPlayerProcess));

playerProcessRouter
  .route("/:id")
  .get(tryCatch(getPlayerProcessById))
  .put(tryCatch(updatePlayerProcessById))
  .delete(tryCatch(deletePlayerProcessById));
export default playerProcessRouter;
