import { Alert, CircularProgress } from '@mui/material';
import { useParams, Link } from 'react-router';
import { useTask } from '../queries/tasks';

function TaskDetailsPage() {
  const { id } = useParams();
  const { data: task, isPending, isError, error } = useTask(id);

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <div>
      <h1>Task details </h1>
      <p>Taks Id {id}</p>
      <div>{task.status}</div>
      <div>{task.description}</div>
      <Link to={`/tasks/${id}/edit`}>Edit</Link>
    </div>
  );
}

export default TaskDetailsPage;
