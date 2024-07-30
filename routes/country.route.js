import express from 'express';
import {
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
} from '../controllers/country.controller.js';
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const languageRouter = express.Router();

languageRouter.route("/")
    .get(tryCatch(getCountries))
    .post(tryCatch(createCountry));

languageRouter
  .route("/:id")
  .get(tryCatch(getCountryById))
  .put(tryCatch(updateCountry))
  .delete(tryCatch(deleteCountry));
export default languageRouter;

