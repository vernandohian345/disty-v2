import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // dummy notif sementara
    setNotifications([
      {
        id: 1,
        title: "Pembayaran berhasil diverifikasi",
      },
      {
        id: 2,
        title: "Sertifikat sudah tersedia",
      },
    ]);
  }, []);

  // close dropdown klik luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1700px] mx-auto px-7 lg:px-6 pt-6">
        {/* NAVBAR */}
        <div
          className="
            h-20
            flex
            items-center
            justify-between
          "
        >
          {/* DESKTOP */}
          <div
            className="
              hidden md:flex
              items-center
              mx-auto
              bg-white/85
              border border-white/20
              rounded-[18px]
              px-2 py-1
              shadow-lg shadow-black/5
              backdrop-blur-xl
            "
          >
            {/* MENU */}
            <nav className="flex items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-400"
                      : "text-black/80 hover:text-orange-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Beranda
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-orange-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/pelatihan"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-400"
                      : "text-black/80 hover:text-orange-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Pelatihan
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-orange-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/sertifikasi"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-400"
                      : "text-black/80 hover:text-orange-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Sertifikasi
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-orange-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-400"
                      : "text-black/80 hover:text-orange-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Blog
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-orange-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-400"
                      : "text-black/80 hover:text-orange-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Tentang Kami
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-orange-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-3 ml-4">
              {!user ? (
                <>
                  {/* LOGIN */}
                  <button
                    onClick={() => navigate("/login")}
                    className="
                      px-4 py-2
                      text-sm font-bold
                      text-slate-700
                      hover:text-black
                      hover:bg-black/5
                      rounded-lg
                      transition-all
                    "
                  >
                    Login
                  </button>

                  {/* SIGNUP */}
                  <button
                    onClick={() => navigate("/register")}
                    className="
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      text-sm
                      font-semibold
                      px-5
                      py-2.5
                      rounded-xl
                      transition-all
                    "
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    relative
                  "
                  ref={dropdownRef}
                >
                  {/* NOTIFICATION */}
                  <button
                    onClick={() => navigate("/notifications")}
                    className="
                      relative
                      w-10 h-10
                      rounded-full
                      bg-slate-100
                      hover:bg-slate-200
                      flex
                      items-center
                      justify-center
                      transition
                    "
                  >
                    <FaBell
                      className="
                        text-slate-700
                      "
                    />

                    {notifications.length > 0 && (
                      <span
                        className="
                          absolute
                          -top-1
                          -right-1
                          bg-red-500
                          text-white
                          text-[10px]
                          w-5 h-5
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-bold
                        "
                      >
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  {/* PROFILE BUTTON */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="
                      flex
                      items-center
                      gap-3
                      hover:bg-slate-100
                      rounded-2xl
                      px-2
                      py-1.5
                      transition
                    "
                  >
                    {/* AVATAR */}
                    <div
                      className="
                        w-10 h-10
                        rounded-full
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaUserCircle
                        className="
                          text-orange-500
                        "
                        size={22}
                      />
                    </div>

                    {/* USER */}
                    <div className="text-left">
                      <p
                        className="
                          text-sm
                          font-bold
                          text-slate-800
                        "
                      >
                        {user.name}
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-500
                          capitalize
                        "
                      >
                        {user.role}
                      </p>
                    </div>
                  </button>

                  {/* DROPDOWN */}
                  {dropdownOpen && (
                    <div
                      className="
                        absolute
                        top-16
                        right-0
                        w-80
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        border
                        border-slate-200
                        overflow-hidden
                        z-50
                      "
                    >
                      {/* HEADER */}
                      <div
                        className="
                          p-5
                          border-b
                          border-slate-100
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className="
                              w-14 h-14
                              rounded-full
                              bg-orange-100
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <FaUserCircle
                              className="
                                text-orange-500
                              "
                              size={34}
                            />
                          </div>

                          <div>
                            <h3
                              className="
                                font-bold
                                text-slate-800
                              "
                            >
                              {user.name}
                            </h3>

                            <p
                              className="
                                text-sm
                                text-slate-500
                              "
                            >
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* MENU */}
                      <div className="p-3">
                        {/* PROFILE */}
                        <button
                          onClick={() => navigate("/profile")}
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-2xl
                            hover:bg-slate-100
                            transition
                          "
                        >
                          <FaUser />

                          <span>Profil Saya</span>
                        </button>

                        {/* DASHBOARD */}
                        {user.role === "admin" && (
                          <button
                            onClick={() => navigate("/dashboard")}
                            className="
                              w-full
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              rounded-2xl
                              hover:bg-slate-100
                              transition
                            "
                          >
                            <FaTachometerAlt />

                            <span>Dashboard Admin</span>
                          </button>
                        )}

                        {/* LOGOUT */}
                        <button
                          onClick={handleLogout}
                          className="
                            w-full
                            mt-4
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-2xl
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            transition
                          "
                        >
                          <FaSignOutAlt />

                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="
                md:hidden
                w-12 h-12
                rounded-2xl
                bg-white/80
                border
                border-white/10
                text-[#2B1D16]
                flex
                items-center
                justify-center
                backdrop-blur-xl
              "
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-md
          transition-all duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className={`
            absolute top-0 right-0
            w-[85%]
            max-w-sm
            h-full
            bg-gradient-to-b
            from-[#0f172a]
            to-[#1e293b]
            border-l
            border-white/10
            p-8
            transition-all duration-300
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* TOP */}

          <nav className="mt-12 flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              Beranda
            </NavLink>

            <NavLink
              to="/pelatihan"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              Pelatihan
            </NavLink>

            <NavLink
              to="/sertifikasi"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              Sertifikasi
            </NavLink>

            <NavLink
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              Blog
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              Tentang Kami
            </NavLink>
          </nav>

          <div className="mt-10 flex flex-col gap-4">
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="w-full h-12 rounded-2xl border border-white/10 text-white font-semibold"
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/register");
                setIsOpen(false);
              }}
              className="w-full h-12 rounded-2xl bg-orange-500 text-white font-semibold"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Disty
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="
                w-12 h-12
                rounded-2xl
                bg-white/10
                text-white
                flex
                items-center
                justify-center
              "
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
