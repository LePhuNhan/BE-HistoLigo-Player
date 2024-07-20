import express from "express";
import { addPlayerProfile, getPlayerProfile } from "../controller/playerProfile.controller.js";
import { tryCatch } from "../Utils/tryCatch.middleware.js";

const playerRouter = express.Router();

playerRouter
  .route("/")
  .post(tryCatch(addPlayerProfile));

playerRouter
  .route("/:id")
  .get(tryCatch(getPlayerProfile));

export default playerRouter;
