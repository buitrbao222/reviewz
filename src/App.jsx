import { Spin } from 'antd';
import AdminLayout from 'components/admin/AdminLayout';
import MainLayout from 'components/main/MainLayout';
import RequireAdmin from 'components/routes/RequireAdmin';
import HomePage from 'pages';
import AdminActorPage from 'pages/admin/actor';
import AdminDashboardPage from 'pages/admin/dashboard';
import AdminDirectorPage from 'pages/admin/director';
import AdminGenrePage from 'pages/admin/genre';
import AdminHashtagPage from 'pages/admin/hashtag';
import AdminMovieCreatePage from 'pages/admin/movie/create';
import AdminMovieEditPage from 'pages/admin/movie/edit';
import AdminMovieListPage from 'pages/admin/movie';
import AdminRequestPage from 'pages/admin/request';
import AdminReviewPage from 'pages/admin/review';
import AdminUserPage from 'pages/admin/user';
import MovieDetailsPage from 'pages/movie';
import SearchPage from 'pages/search';
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

        <Route path="director" element={<AdminDirectorPage />} />

        <Route path="actor" element={<AdminActorPage />} />

        <Route path="request" element={<AdminRequestPage />} />

        <Route path="movie">
          <Route index element={<AdminMovieListPage />} />
          <Route path="create" element={<AdminMovieCreatePage />} />
          <Route path="edit/:id" element={<AdminMovieEditPage />} />
        </Route>

        <Route path="hashtag" element={<AdminHashtagPage />} />

        <Route path="review" element={<AdminReviewPage />} />

        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
