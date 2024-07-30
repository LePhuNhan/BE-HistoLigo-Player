import express from 'express';
import {
    createLanguage,
    getLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
} from '../controllers/language.controller.js';
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const languageRouter = express.Router();

languageRouter.route("/")
    .get(tryCatch(getLanguages))
    .post(tryCatch(createLanguage));

languageRouter
  .route("/:id")
  .get(tryCatch(getLanguageById))
  .post(tryCatch(updateLanguage))
  .delete(tryCatch(deleteLanguage));
export default languageRouter;

