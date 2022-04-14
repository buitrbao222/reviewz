import { Spin } from 'antd';
import AdminLayout from 'components/admin/AdminLayout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import HomePage from 'pages';
import AdminMovieCreatePage from 'pages/admin/movie/create';
import AdminDashboardPage from 'pages/admin/dashboard';
import AdminGenresPage from 'pages/admin/genres';
import AdminMovieListPage from 'pages/admin/movie/list';
import AdminUsersPage from 'pages/admin/users';
import MovieDetailsPage from 'pages/movie';
import SearchPage from 'pages/search';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useUserStore from 'store/userStore';
import AdminMovieEditPage from 'pages/admin/movie/edit';

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

        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route
        path="admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="genres" element={<AdminGenresPage />} />

        <Route path="movie">
          <Route path="list" element={<AdminMovieListPage />} />
          <Route path="create" element={<AdminMovieCreatePage />} />
          <Route path="edit/:id" element={<AdminMovieEditPage />} />
        </Route>

        <Route index element={<Navigate to="/admin/users" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
