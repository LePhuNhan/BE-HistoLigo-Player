import express from "express";
import {
  createDocumentation,
  getAllDocumentation,
  getDocumentationById,
  updateDocumentation,
  deleteDocumentation,
  getDocumentsByTopicId,
} from "../controllers/documentation.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const documentationRouter = express.Router();

documentationRouter
  .route("/")
  .get(tryCatch(getAllDocumentation))
  .post(tryCatch(createDocumentation));

documentationRouter
  .route("/:id")
  .get(tryCatch(getDocumentationById))
  .put(tryCatch(updateDocumentation))
  .delete(tryCatch(deleteDocumentation));

documentationRouter.route("/topic/:topicId").get(tryCatch(getDocumentsByTopicId));
export default documentationRouter;
