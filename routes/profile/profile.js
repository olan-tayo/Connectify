import express from "express";
import { GetAllProfiles } from "../../controllers/profile.js";
const router = express.Router();

router.get("/:id", GetAllProfiles);

export default router;
