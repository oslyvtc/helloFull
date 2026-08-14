import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';

import { Link } from 'react-router';

import type { Task } from '../types/task';

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

function TaskCard({ task, isDeleting, onDelete }: TaskCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">{task.title}</Typography>

          <Typography variant="body2">{task.description}</Typography>

          <Chip label={task.status} size="small" />
        </Stack>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/tasks/${task.id}`}>
          View
        </Button>
        <Button color="error" disabled={isDeleting} onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
