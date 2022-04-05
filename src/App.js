import { Spin } from 'antd';
import axios from 'axios';
import AdminLayout from 'components/admin/AdminLayout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import DashboardPage from 'pages/admin/dashboard';
import UsersPage from 'pages/admin/users';
import HomePage from 'pages';
import MovieDetailsPage from 'pages/movie';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useGenreStore from 'store/genreStore';
import useUserStore from 'store/userStore';

function App() {
  const [loading, setLoading] = useState(true);

  const getToken = useUserStore(store => store.getToken);

  const setGenres = useGenreStore(store => store.setGenres);

  useEffect(() => {
    getToken();

    async function loadGenres() {
      try {
        const response = await axios.get('category');

        console.log('Get genres response', response);

        setGenres(response);
      } catch (error) {
        console.log('Get genres error', error);
      } finally {
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-ant-layout">
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
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
