import mongoose from "mongoose";
import taskModel from "../models/tasks.js";

/**
 * GET /api/v1/task
 *
 * Supports:
 * - q=... (search by taskName)
 * - completed=true|false
 */
export async function listTasks(req, res) {
  const { q, completed } = req.query;

  const filter = { userId: req.user.id };

  if (typeof completed === "string") {
    if (completed === "true") filter.completed = true;
    if (completed === "false") filter.completed = false;
  }

  if (typeof q === "string" && q.trim()) {
    // Use a simple case-insensitive regex search for predictable behavior.
    filter.taskName = { $regex: q.trim(), $options: "i" };
  }

  const tasks = await taskModel
    .find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return res.json({ tasks });
}

/**
 * POST /api/v1/task
 */
export async function createTask(req, res) {
  const { taskName } = req.validatedBody;

  const created = await taskModel.create({
    userId: req.user.id,
    taskName,
  });

  return res.status(201).json({ task: created });
}

/**
 * PATCH /api/v1/task/:id
 */
export async function updateTask(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const updated = await taskModel.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    req.validatedBody,
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ task: updated });
}

/**
 * DELETE /api/v1/task/:id
 */
export async function deleteTask(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const deleted = await taskModel.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task deleted" });
}