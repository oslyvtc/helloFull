import type { CreateTask, Task } from '../types/task';
import { apiFetch } from './apiClient';

export function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>('/tasks');
}

export function getTask(id: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`);
}

export function createTask(task: CreateTask): Promise<Task> {
  return apiFetch<Task>('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export async function updateTask(id: string, task: Partial<CreateTask>): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
