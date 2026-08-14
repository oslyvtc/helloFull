import { Navigate, Route, Routes } from 'react-router';

import MainLayout from './layouts/MainLayout';
import EditTaskPage from './pages/EditTaskPage';
import NewTaskPage from './pages/NewTaskPage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/new" element={<NewTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
        <Route path="/tasks/:id/edit" element={<EditTaskPage />} />

        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
