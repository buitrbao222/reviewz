import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      main layout
      <Outlet />
    </div>
  );
}
