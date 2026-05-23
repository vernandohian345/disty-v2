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
<<<<<<< HEAD
import ProfilePage from "./pages/profile";
=======
import Payment from "./pages/frontend/Payment";
>>>>>>> f08aed85432846d8d61e9489db3ab47ced7fc0f1

import Dashboard from "./pages/admin/Dashboard";

import IndexPelatihan from "./pages/admin/Pelatihan/Index";
import CreatePelatihan from "./pages/admin/Pelatihan/Create";

import IndexSertifikasi from "./pages/admin/Sertifikasi/Index";
import CreateSertifikasi from "./pages/admin/Sertifikasi/Create";

import IndexPembayaran from "./pages/admin/pembayaran/Index";

import Pembayaran from "./pages/admin/Pembayaran";
import AdminBlog from "./pages/admin/Blog";

import IndexUser from "./pages/admin/User/Index";
import CreateUser from "./pages/admin/User/Create";
// import SertifikatPelatihan from "./pages/admin/SertifikatPelatihan";

import SertifikatPelatihan from "./pages/admin/SertifikatPelatihan";

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
<<<<<<< HEAD
        <Route path="/profile" element={<ProfilePage />} />
=======
        <Route path="/payment" element={<Payment />} />
>>>>>>> f08aed85432846d8d61e9489db3ab47ced7fc0f1

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NOTIFICATIONS */}
        <Route path="/notifications" element={<Notifications />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <RouteAdmin>
              <Dashboard />
            </RouteAdmin>
          }
        />

        {/* ADMIN PELATIHAN */}
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

        {/* ADMIN SERTIFIKASI */}
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

        {/* ADMIN PEMBAYARAN */}
        <Route
          path="/admin/pembayaran"
          element={
            <RouteAdmin>
              <Pembayaran />
            </RouteAdmin>
          }
        />

        <Route
          path="/admin/pembayaran/index"
          element={
            <RouteAdmin>
              <IndexPembayaran />
            </RouteAdmin>
          }
        />

        {/* ADMIN BLOG */}
        <Route
          path="/admin/blog"
          element={
            <RouteAdmin>
              <AdminBlog />
            </RouteAdmin>
          }
        />

        {/* ADMIN USER */}
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
<<<<<<< HEAD
        {/* SERTIFIKAT PELATIHAN
        <Route
          path="/admin/sertifikat-pelatihan"
          element={<SertifikatPelatihan />}
        /> */}

=======

        {/* SERTIFIKAT PELATIHAN */}
        <Route
          path="/admin/sertifikat-pelatihan"
          element={
            <RouteAdmin>
              <SertifikatPelatihan />
            </RouteAdmin>
          }
        />
>>>>>>> f08aed85432846d8d61e9489db3ab47ced7fc0f1
      </Routes>
    </BrowserRouter>
  );
}