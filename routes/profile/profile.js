import express from "express";
import {
  createProfile,
  GetAllProfiles,
  updateProfile,
} from "../../controllers/profile.js";
const router = express.Router();

router.get("/:id", GetAllProfiles);
router.post("/:id", createProfile);
router.patch("/:id", updateProfile);

export default router;
