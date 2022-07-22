import express from "express";
import handleLogin from "../controllers/homeControllers/handleLogin.js";

const router = express.Router();

const webRoutes = (app) => {
  router.get("/", handleLogin);
  return app.use("/", router);
};

export default webRoutes;
