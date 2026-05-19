import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/frontend/Home";
import Blog from "./pages/frontend/Blog";
import BlogDetail from "./pages/frontend/BlogDetail";
import About from "./pages/frontend/About";
import Notifications from "./pages/frontend/Notifications";

import Dashboard from "./pages/admin/Dashboard";
import Pelatihan from "./pages/admin/Pelatihan";
import Sertifikasi from "./pages/admin/Sertifikasi";
<<<<<<< HEAD
import Pembayaran from "./pages/admin/Pembayaran";
=======
import AdminBlog from "./pages/admin/Blog";
>>>>>>> 3026bae3db6daa41500443d4c9f26642de0da7a8

import RouteAdmin from "./routes/AdminRoute";
import ScrollToTop from "./components/shared/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* FRONTEND */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NOTIFICATIONS */}
        <Route path="/notifications" element={<Notifications />} />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <RouteAdmin>
              <Dashboard />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/pelatihan"
          element={
            <RouteAdmin>
              <Pelatihan />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/sertifikasi"
          element={
            <RouteAdmin>
              <Sertifikasi />
            </RouteAdmin>
          }
        />

<<<<<<< HEAD
        {/* PEMBAYARAN */}
        <Route
          path="/admin/pembayaran"
          element={
            <RouteAdmin>
              <Pembayaran />
            </RouteAdmin>
          }
        />
=======
        {/* BLOG ADMIN */}
        <Route
          path="/admin/blog"
          element={
            <RouteAdmin>
              <AdminBlog />
            </RouteAdmin>
          }
        />

>>>>>>> 3026bae3db6daa41500443d4c9f26642de0da7a8
      </Routes>
    </BrowserRouter>
  );
}