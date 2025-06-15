import express from "express";

import {
  login,
  register,
  getUserData,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middleware/authCheck.js";
import { checkDuplicateUsernameOrEmail } from "../middleware/userCheck.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", [checkDuplicateUsernameOrEmail], register);

router.get("/user", [verifyToken], getUserData);

export default router;
