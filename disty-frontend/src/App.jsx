import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/frontend/Home";
import Blog from "./pages/frontend/Blog";
import BlogDetail from "./pages/frontend/BlogDetail";
import About from "./pages/frontend/About";
import Notifications from "./pages/frontend/Notifications";
import Bootcamp from "./pages/frontend/Bootcamp";
import BootcampDetail from "./pages/frontend/BootcampDetail";
import Checkout from "./pages/frontend/Checkout";
import Success from "./pages/frontend/Success";
import ProfilePage from "./pages/profile";

import Dashboard from "./pages/admin/Dashboard";
import IndexPelatihan from "./pages/admin/Pelatihan/Index";
import CreatePelatihan from "./pages/admin/Pelatihan/Create";
import IndexSertifikasi from "./pages/admin/Sertifikasi/Index";
import CreateSertifikasi from "./pages/admin/Sertifikasi/Create";

import Pembayaran from "./pages/admin/Pembayaran";
import AdminBlog from "./pages/admin/Blog";
import IndexUser from "./pages/admin/User/Index";
import CreateUser from "./pages/admin/User/Create";
// import SertifikatPelatihan from "./pages/admin/SertifikatPelatihan";

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
        <Route path="/pelatihan" element={<Bootcamp />} />
        <Route path="/pelatihan/:slug" element={<BootcampDetail />} />
        <Route path="/checkout/:slug" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<ProfilePage />} />

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
              <IndexPelatihan />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/pelatihan/create"
          element={
            <RouteAdmin>
              <CreatePelatihan />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/sertifikasi"
          element={
            <RouteAdmin>
              <IndexSertifikasi />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/sertifikasi/create"
          element={
            <RouteAdmin>
              <CreateSertifikasi />
            </RouteAdmin>
          }
        />

        {/* <Route
            path="/admin/sertifikasi"
            element={
              <RouteAdmin>
                <Sertifikasi />
              </RouteAdmin>
            }
        /> */}

        {/* PEMBAYARAN */}
        <Route
          path="/admin/pembayaran"
          element={
            <RouteAdmin>
              <Pembayaran />
            </RouteAdmin>
          }
        />
        {/* BLOG ADMIN */}
        <Route
          path="/admin/blog"
          element={
            <RouteAdmin>
              <AdminBlog />
            </RouteAdmin>
          }
        />

        {/* USER ADMIN */}
        <Route
          path="/admin/users"
          element={
            <RouteAdmin>
              <IndexUser />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/users/create"
          element={
            <RouteAdmin>
              <CreateUser />
            </RouteAdmin>
          }
        />
        {/* SERTIFIKAT PELATIHAN
        <Route
          path="/admin/sertifikat-pelatihan"
          element={<SertifikatPelatihan />}
        /> */}

      </Routes>
    </BrowserRouter>
  );
}
