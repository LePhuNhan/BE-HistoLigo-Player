import express from "express";
import {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic
} from "../controllers/topic.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const topicRouter = express.Router();

topicRouter.route("/")
    .get(tryCatch(getTopics))
    .post(tryCatch(createTopic));

topicRouter
  .route("/:id")
  .get(tryCatch(getTopicById))
  .put(tryCatch(updateTopic))
  .delete(tryCatch(deleteTopic));
export default topicRouter;
