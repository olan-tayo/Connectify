import express from "express";
import { GetAllProfiles, GetAllUsers } from "../../controllers/users.js";
const router = express.Router();

router.get("/users", GetAllUsers);
router.get("/profiles/:id", GetAllProfiles);

export default router;
