import express from 'express';
import {
    getTestDetailsAndQuestions
} from '../controllers/question.controller.js';
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const questionRouter = express.Router();

questionRouter.route("/:testId")
    .get(tryCatch(getTestDetailsAndQuestions))

questionRouter
  .route("/:id")
export default questionRouter;

