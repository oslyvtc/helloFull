import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';

import { taskSchema, type TaskFormValues } from '../schemas/taskSchema';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from '../api/tasks';

function NewTaskPage() {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
    },
  });

  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });

      navigate('/tasks');
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    createTaskMutation.mutate(data);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Create Task</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register('title')}
            label="Title"
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                error={Boolean(errors.status)}
                helperText={errors.status?.message}
              >
                <MenuItem value="todo">Todo</MenuItem>

                <MenuItem value="in-progress">In progress</MenuItem>

                <MenuItem value="done">Done</MenuItem>
              </TextField>
            )}
          />

          {createTaskMutation.isError && (
            <Alert severity="error">{createTaskMutation.error.message}</Alert>
          )}

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={createTaskMutation.isPending}>
              {createTaskMutation.isPending ? 'Creating...' : 'Create'}
            </Button>

            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => reset()}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}

export default NewTaskPage;
