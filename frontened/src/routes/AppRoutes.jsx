import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CreateEventPage from "../pages/events/CreateEventPage";
import EventsPage from "../pages/events/EventsPage";
import ManageEventPage from "../pages/events/ManageEventPage";
import EventDetailPage from "../pages/events/EventDetailPage";
import EditEventPage from "../pages/events/EditEventPage";
import PostEventPage from "../pages/events/PostEventPage";
import ProfilePage from "../pages/users/ProfilePage";
import UserDetailPage from "../pages/users/UserDetailPage";
import UsersPage from "../pages/users/UsersPage";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events"
        element={user ? <EventsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events/create"
        element={user ? <CreateEventPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events/manage"
        element={user ? <ManageEventPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events/:id"
        element={user ? <EventDetailPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events/:id/edit"
        element={user ? <EditEventPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events/:id/post"
        element={user ? <PostEventPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={user ? <UsersPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/users/:id"
        element={user ? <UserDetailPage /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
