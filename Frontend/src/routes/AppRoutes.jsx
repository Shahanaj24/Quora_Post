import { Navigate, Route, Routes } from 'react-router-dom';
import CreatePostPage from '../pages/posts/CreatePostPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import EditPostPage from '../pages/posts/EditPostPage';
import HomePage from '../pages/posts/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostDetailsPage from '../pages/posts/PostDetailsPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from '../components/layout/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/posts/:id" element={<ProtectedRoute><PostDetailsPage /></ProtectedRoute>} />
      <Route path="/posts/new" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
      <Route path="/posts/:id/edit" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
