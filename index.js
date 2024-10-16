import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routeFactory } from "./routes/index.js";
import { validToken } from "./middlewares/validToken.middleware.js";
import rootRouter from "./routes/index.route.js";
import { initLocaleData } from "./localization.js";

dotenv.config();

const app = express();

app.use(cookieParser());

// const allowlist = ['http://localhost:3000', 'https://histolingo-player-fe.cd95dznd.xyz']
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions = {};
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate));

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(morgan("combined"));
app.use(validToken);

routeFactory(app);
app.use(rootRouter);
// app.use("/api/v1", rootRouter);
// app.get("/api/v1/verify", middlewares.verifyJwt(true), (req, res) => {
//   try {
//     const newAT = token.generateToken({
//       _id: req.dataToken._id,
//       userName: req.dataToken.userName,
//       tokenType: "AT",
//     });
//     res.status(200).send({
//       data: {
//         accessToken: newAT,
//         refreshToken: req.token,
//       },
//     });
//   } catch (error) {
//     res.status(401).send({
//       message: error.message ?? "Bạn cần phải đăng nhập!",
//     });
//   }
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    initLocaleData();
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
