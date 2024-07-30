import express from "express";
import playerRouter from "./player.route.js";
import loadRequestContentLanguage from "../middlewares/localization.middleware.js"
import topicRouter from "./topic.route.js";
import languageRouter from "./topic.route.js";
import countryRouter from "./country.route.js";
const routes = [
  {
    path: "/player",
    router: playerRouter,
  },
  {
    path: "/topic",
    router: topicRouter,
  },
  {
    path: "/language",
    router: languageRouter,
  },
  {
    path: "/country",
    router: countryRouter,
  },
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/player") {
      app.use(route.path,loadRequestContentLanguage, route.router);
    }
    if (route.path === "/topic") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/language") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
    if (route.path === "/country") {
      app.use(route.path, loadRequestContentLanguage, route.router);
    }
  });
}
