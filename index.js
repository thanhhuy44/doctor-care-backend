import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import webRoutes from "./src/routes/webRoutes.js";
import configViewEngine from "./src/config/viewEngine.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/connectDb.js";
// mongoose.connect("mongodb://localhost/doctorCareDb", { useNewUrlParser: true });

connectDB();

const app = express();
app.use(cors());
configViewEngine(app);
dotenv.config();

//Đăng ký Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.use(fileUpload());

app.listen(3030, () => {
  console.log("App listening on port 3030");
  console.log(process.env.BASE_URL);
});
webRoutes(app);
