import express from "express";
// controller import
import {
  userLogin,
  userSignup,
  userLogout,
} from "../controller/user.controller.js";
// middleware import
import { requireUser } from "../middlewares/requireUser.middleware.js";
import { tryCatch } from "../Utils/tryCatch.middleware.js";
import { authorization } from "../controller/author.controller.js";

const router = express.Router();

router
  .route("/login")
  .post(tryCatch(userLogin))
  .get(tryCatch(requireUser), tryCatch(authorization));
//   .post(tryCatch(postDefault))       with middleware validation login

router.route("/register").post(tryCatch(userSignup));
//   .post(tryCatch(postDefault))       with middleware validation register
debugger;
router.route("/logout").delete(tryCatch(requireUser), tryCatch(userLogout));
//   .post(tryCatch(postDefault))

export { router as userRouter };
