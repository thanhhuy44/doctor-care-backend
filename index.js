import webRoutes from "./src/routes/webRoutes.js";
import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose.connect("mongodb://localhost/doctorCareDb", { useNewUrlParser: true });

app.listen(3030, () => {
  console.log("App listening on port 3030");
});
webRoutes(app);
