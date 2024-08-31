import express from 'express';
import {
    getTestDetailsAndQuestions,
    checkAnswer
} from '../controllers/question.controller.js';
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const questionRouter = express.Router();

questionRouter.route("/:testId")
    .get(tryCatch(getTestDetailsAndQuestions))
    .post(tryCatch(checkAnswer))
questionRouter
  .route("/:id")
export default questionRouter;

