import express from 'express';
import {
    createClass,
    getCountries,
    getClassById,
    updateClass,
    deleteClass,
} from '../controllers/class.controller.js';
import { tryCatch } from "../middlewares/tryCatch.middleware.js";

const classRouter = express.Router();

classRouter.route("/")
    .get(tryCatch(getCountries))
    .post(tryCatch(createClass));

classRouter
  .route("/:id")
  .get(tryCatch(getClassById))
  .put(tryCatch(updateClass))
  .delete(tryCatch(deleteClass));
export default classRouter;

