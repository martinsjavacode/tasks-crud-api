import express from "express";

import {
  createTask,
  getTasks,
  completeTask,
  uncompleteTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { verifyToken } from "../middleware/authCheck.js";

const router = express.Router();

router.post("/", [verifyToken], createTask);

router.get("/", [verifyToken], getTasks);

router.put("/:id/complete", [verifyToken], completeTask);

router.put("/:id/uncomplete", [verifyToken], uncompleteTask);

router.delete("/:id", [verifyToken], deleteTask);

export default router;
