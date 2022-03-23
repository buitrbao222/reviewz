import Dashboard from 'components/admin/dashboard';
import AdminLayout from 'components/admin/layout';
import MainLayout from 'components/main/layout';
import RequireAdmin from 'components/routes/RequireAdmin';
import RequireAuth from 'components/routes/RequireAuth';
import Home from 'pages';
import Logout from 'pages/logout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        />
      </Route>

      <Route
        path="admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
