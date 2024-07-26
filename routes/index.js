import express from "express";
import playerRouter from "./player.route.js";
// import topicRouter from "./topic.route.js";
const routes = [
  {
    path: "/player",
    router: playerRouter,
  },
  // {
  //   path: "/topic",
  //   router: TopicRouter,
  // },
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/player") {
      app.use(route.path, route.router);
    }
    // if (route.path === "/topic") {
    //   app.use(route.path, route.router);
    // }
  });
}
