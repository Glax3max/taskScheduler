import { z } from "zod";

/**
 * Task validation schemas.
 */

export const createTaskSchema = z.object({
  taskName: z.string().trim().min(1, "Task name is required").max(140),
});

export const updateTaskSchema = z.object({
  taskName: z.string().trim().min(1).max(140).optional(),
  completed: z.boolean().optional(),
});

