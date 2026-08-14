import { Link } from 'react-router';

import type { Task } from '../types/task';

type TaskCardTailwindProps = {
  task: Task;
};

function TaskCardTailwind({ task }: TaskCardTailwindProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>

      <p className="mt-2 text-sm text-gray-600">{task.description}</p>

      <div className="mt-4">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {task.status}
        </span>
      </div>

      <div className="mt-4">
        <Link to={`/tasks/${task.id}`} className="font-medium text-blue-600 hover:text-blue-800">
          View
        </Link>
      </div>
    </div>
  );
}

export default TaskCardTailwind;
