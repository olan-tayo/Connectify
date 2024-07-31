import express from "express";
const app = express();
import "dotenv/config";
import auth from "./routes/auth/auth.js";
import profile from "./routes/profile/profile.js";
import verifyToken from "./middlewares/verifyTokenMiddleware.js";
import { connectToDB } from "./util/database.js";
const PORT = process.env.PORT || 8000;
connectToDB((err) => {
  if (!err) {
    /////// SERVER
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  }
});

// app.use(dbMiddleware);

/////// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////// ROUTES
app.use("/api/auth", auth);
app.use("/api/profile", verifyToken, profile);
