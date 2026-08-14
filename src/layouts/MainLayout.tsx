import { NavLink, Outlet, useNavigate } from 'react-router';
import { Container } from '@mui/material';

function MainLayout() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h2>Task Manager</h2>

        <button onClick={() => navigate(-1)}>Back</button>

        <nav>
          <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tasks
          </NavLink>

          {' | '}

          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            Settings
          </NavLink>
        </nav>
      </header>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
