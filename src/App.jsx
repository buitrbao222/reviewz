import { Spin } from 'antd';
import AdminLayout from 'components/admin/AdminLayout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import HomePage from 'pages';
import AdminMovieCreatePage from 'pages/admin/movie/create';
import AdminDashboardPage from 'pages/admin/dashboard';
import AdminGenrePage from 'pages/admin/genre';
import AdminMovieListPage from 'pages/admin/movie/list';
import AdminUserPage from 'pages/admin/user';
import MovieDetailsPage from 'pages/movie';
import SearchPage from 'pages/search';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useUserStore from 'store/userStore';
import AdminMovieEditPage from 'pages/admin/movie/edit';
import AdminReviewPage from 'pages/admin/review';

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
        <Route path="user" element={<AdminUserPage />} />
        <Route path="genre" element={<AdminGenrePage />} />

        <Route path="movie">
          <Route path="list" element={<AdminMovieListPage />} />
          <Route path="create" element={<AdminMovieCreatePage />} />
          <Route path="edit/:id" element={<AdminMovieEditPage />} />
        </Route>

        <Route path="review" element={<AdminReviewPage />} />

        <Route index element={<Navigate to="/admin/user" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
