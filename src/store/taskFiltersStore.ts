import { create } from 'zustand';

import { persist } from 'zustand/middleware';

import type { TaskStatus } from '../types/task';
import { devtools } from 'zustand/middleware';

export type StatusFilter = 'all' | TaskStatus;

export type ViewMode = 'list' | 'grid';

type TaskFiltersState = {
  statusFilter: StatusFilter;
  search: string;
  viewMode: ViewMode;
};

type TaskFiltersActions = {
  setStatusFilter: (status: StatusFilter) => void;

  setSearch: (search: string) => void;

  setViewMode: (mode: ViewMode) => void;

  resetFilters: () => void;
};

type TaskFiltersStore = TaskFiltersState & TaskFiltersActions;

export const useTaskFiltersStore = create<TaskFiltersStore>()(
  devtools(
    persist(
      (set) => ({
        statusFilter: 'all',
        search: '',
        viewMode: 'list',

        setStatusFilter: (statusFilter) => {
          set({ statusFilter });
        },

        setSearch: (search) => {
          set({ search });
        },

        setViewMode: (viewMode) => {
          set({ viewMode });
        },

        resetFilters: () => {
          set({
            statusFilter: 'all',
            search: '',
          });
        },
      }),

      {
        name: 'task-filters',

        partialize: (state) => ({
          // partialize дозволяє вибрати лише частину state для persistence.
          viewMode: state.viewMode,
        }),
      },
    ),
  ),
);
