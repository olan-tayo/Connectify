import express from "express";
const app = express();
import "dotenv/config";
import auth from "./routes/auth/auth.js";
import profile from "./routes/profile/profile.js";
import verifyToken from "./middlewares/verifyTokenMiddleware.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

/////// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////// ROUTES
app.use("/api/auth", auth);
app.use("/api/profile", verifyToken, profile);
