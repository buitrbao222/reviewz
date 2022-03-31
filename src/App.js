import Dashboard from 'components/admin/dashboard';
import AdminLayout from 'components/admin/layout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import Home from 'pages/home';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useUserStore from 'store/userStore';

function App() {
  const [loaded, setLoaded] = useState(false);

  const getToken = useUserStore(store => store.getToken);

  useEffect(() => {
    getToken();
    setLoaded(true);
  }, []);

  if (!loaded) {
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
