import playerRouter from "./playerProfile.route.js";
import loadRequestContentLanguage from "../middlewares/localization.middleware.js"
import topicRouter from "./topic.route.js";
// import languageRouter from "./topic.route.js";
import countryRouter from "./country.route.js";
import documentationRouter from "./documentation.route.js";
import testRouter from "./test.route.js";
import playerProcessRouter from "./playerProcess.route.js";
import questionRouter from "./question.route.js"
import PlayerTestRouter from "./playerTest.route.js";
import FeedbackRouter from "./feedback.route.js"
import classRouter from "./class.route.js";
import userRouter from "./player.route.js";

const routes = [
  {
    path: "/player",
    router: playerRouter,
  },
  {
    path: "/topic",
    router: topicRouter,
  },
  // {
  //   path: "/language",
  //   router: languageRouter,
  // },
  {
    path: "/country",
    router: countryRouter,
  },
  {
    path: "/documentation",
    router: documentationRouter,
  },
  {
    path: "/test",
    router: testRouter,
  },
  {
    path: "/playerProcess",
    router: playerProcessRouter,
  },
  {
    path: "/question",
    router: questionRouter,
  },
  {
    path: "/playerTest",
    router: PlayerTestRouter
  },
  {
    path: "/feedback",
    router: FeedbackRouter
  },
  {
    path: "/class",
    router: classRouter
  },
  {
    path: "/user",
    router: userRouter
  }
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/player") {
      app.use(route.path,loadRequestContentLanguage, route.router);
    }
    if (route.path === "/topic") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    // if (route.path === "/language") {
    //   app.use(route.path, loadRequestContentLanguage, route.router);
    // }
    if (route.path === "/country") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/documentation") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/test") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/playerProcess") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/question") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/playerTest") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/feedback") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/class") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/user") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
  });
}
