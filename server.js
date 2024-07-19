import express from "express";
const app = express();
import "dotenv/config";
import auth from "./routes/auth/auth.js";
const port = process.env.PORT || 8000;

/////// SERVER
app.listen(3000, () => {
  console.log("App running on port 3000");
});

/////// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////// ROUTES
app.get("/api/auth", auth);
