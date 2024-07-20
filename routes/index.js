import express from "express";
import playerRouter from "./player.route.js";

const routes = [
  {
    path: "/player",
    router: playerRouter,
  },
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/player") {
      app.use(route.path, route.router); // public route
    }
  });
}
