import express from "express";
import { GetUsers } from "../../controllers/profileController/users.js";
const router = express.Router();

router.get("/users", GetUsers);

export default router;
