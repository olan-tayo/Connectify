import express from "express";
import { GetAllUsers } from "../../controllers/user.js";
const router = express.Router();

router.get("/", GetAllUsers);

export default router;
