import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../validators/taskSchemas.js";
import { createTask, deleteTask, listTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router();

// Everything in /task is protected (dashboard-only).
router.use(requireAuth);

router.get("/", asyncHandler(listTasks));
router.post("/", validateBody(createTaskSchema), asyncHandler(createTask));
router.patch("/:id", validateBody(updateTaskSchema), asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;