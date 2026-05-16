import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import Button from "../ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1700px] mx-auto px-7 lg:px-6 pt-6">
        {/* Floating Navbar */}
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 ml-9">
            <img
              src="/src/assets/images/logo-putih.png"
              alt="Disty Akademi"
              className="w-[120px] h-20 object-contain"
            />
          </div>

          {/* Desktop Right Content */}
          <div className="hidden md:flex items-center bg-white/85 border border-white/20 rounded-[18px] px-2 py-1.5 shadow-lg shadow-black/5 ml-auto">
            {/* Menu */}
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
                to="/program"
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
                    Program
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
                to="/tentang kami"
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

            <div className="flex items-center gap-2 ml-4">
              {/* Login */}
              <button className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-300 active:scale-95">
                Login
              </button>

              {/* Sign Up */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-[1.02]">
                Sign Up
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden w-12 h-12 rounded-2xl bg-white/15 border border-white/10 text-white flex items-center justify-center backdrop-blur-xl"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-gradient-to-b from-[#0f172a] to-[#1e293b] border-l border-white/10 p-8 transition-all duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo.png"
                alt="Disty Akademi"
                className="w-11 h-11 object-contain"
              />

              <div>
                <h2 className="text-xl font-black text-white">Disty</h2>

                <p className="text-sm text-white/60">Akademi Digital</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
