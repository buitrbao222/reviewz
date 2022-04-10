import { Spin } from 'antd';
import AdminLayout from 'components/admin/AdminLayout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import HomePage from 'pages';
import DashboardPage from 'pages/admin/dashboard';
import GenresPage from 'pages/admin/genres';
import UsersPage from 'pages/admin/users';
import MovieDetailsPage from 'pages/movie';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useUserStore from 'store/userStore';

function App() {
  const loadFromToken = useUserStore(store => store.loadFromToken);

  const loadingFromToken = useUserStore(store => store.loadingFromToken);

  useEffect(() => {
    loadFromToken();
  }, []);

  if (loadingFromToken) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Spin size="large" className="scale-[3]" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="movie/:id" element={<MovieDetailsPage />} />
      </Route>

      <Route
        path="admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="user" element={<UsersPage />} />
        <Route path="genre" element={<GenresPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
