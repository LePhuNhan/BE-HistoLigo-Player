import express from "express";
import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getTestsByTopicId,
} from "../controllers/test.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const testRouter = express.Router();

testRouter.route("/").get(tryCatch(getAllTests)).post(tryCatch(createTest));

testRouter
  .route("/:id")
  .get(tryCatch(getTestById))
  .put(tryCatch(updateTest))
  .delete(tryCatch(deleteTest));

testRouter.route("/topic/:topicId").get(tryCatch(getTestsByTopicId));

export default testRouter;
