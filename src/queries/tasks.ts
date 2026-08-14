import { useQuery } from '@tanstack/react-query';

import { getTask, getTasks } from '../api/tasks';

export const taskKeys = {
  all: ['tasks'] as const,

  detail: (id?: string) => ['tasks', id] as const,
};

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: getTasks,
  });
}

export function useTask(id?: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),

    queryFn: () => {
      if (!id) {
        throw new Error('Task id is required');
      }

      return getTask(id);
    },

    enabled: !!id,
  });
}
