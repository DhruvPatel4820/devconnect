import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import PublicRoute from "../components/auth/PublicRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Landing from "../pages/Landing/Landing";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import SinglePost from "../pages/Post/SinglePost";
import SavedPosts from "../pages/SavedPosts/SavedPosts";
import NotFound from "../pages/NotFound/NotFound";
import Settings from "../pages/Settings/Settings";

import ProfilePage from "../components/Profile/ProfilePage/ProfilePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC LANDING ================= */}

        <Route path="/" element={<Landing />} />

        {/* ================= AUTH ROUTES ================= */}

        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/forgot-password"
            element={<h1>Forgot Password Page</h1>}
          />
        </Route>

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />

          <Route path="/profile/:username" element={<ProfilePage />} />

          <Route path="/search" element={<Search />} />

          <Route path="/post/:postId" element={<SinglePost />} />

          <Route path="/saved" element={<SavedPosts />} />

          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
