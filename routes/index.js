import { userRouter } from "./user.route.js";
import { validToken } from "../middlewares/validToken.middleware.js";
import { requireUser } from "../middlewares/requireUser.middleware.js";
// const router = express.Router();

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
  /* {
    path: "/private",
    router: defaultRouter,
  }, */
];

function routeFactory(app) {
  routes.map((route) => {
    if ((route.path === "/user")) {
      app.use(route.path, route.router); //public route
    }
  });
}

export { routeFactory };
