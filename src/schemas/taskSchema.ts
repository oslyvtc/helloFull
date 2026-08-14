import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must contain at least 3 characters'),

  description: z.string().max(500, 'Description must contain at most 500 characters'),

  status: z.enum(['todo', 'in-progress', 'done']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
