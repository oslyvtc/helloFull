import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

import { Link } from 'react-router';

import TaskCard from '../components/TaskCard';
import { useTasks } from '../queries/tasks';
import { deleteTask } from '../api/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTaskFiltersStore } from '../store/taskFiltersStore';
import TaskToolbar from '../components/TaskToolbar';
import { useTranslation } from 'react-i18next';
import SettingsPage from './SettingsPage';

function TasksPage() {
  const { data: tasks, isPending, isError, error } = useTasks();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  const { t } = useTranslation();

  const search = useTaskFiltersStore((state) => state.search);

  const statusFilter = useTaskFiltersStore((state) => state.statusFilter);

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const viewMode = useTaskFiltersStore((state) => state.viewMode);

  const setViewMode = useTaskFiltersStore((state) => state.setViewMode);

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row">
        <SettingsPage />
        <Typography variant="h4">{t('tasks')}</Typography>

        <Button component={Link} to="/tasks/new" variant="contained">
          {t('createTask')}
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>

          <Button
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
        </Stack>
      </Stack>
      <TaskToolbar />
      {viewMode === 'list' ? (
        <Stack spacing={2}>
          {filteredTasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={(id) => {
                deleteMutation.mutate(id);
              }}
            />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 2,
          }}
        >
          {filteredTasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={(id) => {
                deleteMutation.mutate(id);
              }}
            />
          ))}
        </Box>
      )}
    </Stack>
  );
}

export default TasksPage;
