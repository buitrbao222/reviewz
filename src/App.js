import Dashboard from 'components/admin/dashboard';
import AdminLayout from 'components/admin/layout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import Home from 'pages/home';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useUserStore from 'store/userStore';

function App() {
  const initialized = useUserStore(store => store.initialized);

  const parseUserFromToken = useUserStore(store => store.parseUserFromToken);

  useEffect(() => {
    parseUserFromToken();
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
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
