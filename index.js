import webRoutes from "./src/routes/webRoutes.js";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost/doctorCareDb", { useNewUrlParser: true });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3030, () => {
  console.log("App listening on port 3030");
});
webRoutes(app);
