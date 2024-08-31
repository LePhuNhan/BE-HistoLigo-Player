import express from "express";
import {
    createFeedback,deleteFeedback,getAllFeedbacks,getFeedbackById,updateFeedbackStatus
} from "../controllers/feedback.controller.js";
import { tryCatch } from "../middlewares/tryCatch.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const feedbackRouter = express.Router();

feedbackRouter.route("/")
    .get(tryCatch(getAllFeedbacks))
    .post(verifyToken, tryCatch(createFeedback));

feedbackRouter
  .route("/:id")
  .get(tryCatch(getFeedbackById))
  .put(tryCatch(verifyToken, updateFeedbackStatus))
  .delete(tryCatch(deleteFeedback));
export default feedbackRouter;
