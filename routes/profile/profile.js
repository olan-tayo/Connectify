import express from "express";
import { createProfile, GetAllProfiles } from "../../controllers/profile.js";
const router = express.Router();

router.get("/:id", GetAllProfiles);
router.post("/:id", createProfile);

export default router;
