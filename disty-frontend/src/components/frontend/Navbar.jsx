import { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";

import Button from "../ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-xl bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo.png"
                alt="Disty Akademi"
                className="w-11 h-11 object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className="text-slate-600 hover:text-primary transition font-medium"
              >
                Beranda
              </a>

              <a
                href="#"
                className="text-slate-600 hover:text-primary transition font-medium"
              >
                Program
              </a>

              <a
                href="#"
                className="text-slate-600 hover:text-primary transition font-medium"
              >
                Artikel
              </a>

              <a
                href="#"
                className="text-slate-600 hover:text-primary transition font-medium"
              >
                FAQ
              </a>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Desktop Button */}
              <div className="hidden lg:block">
                <Button>Mulai Belajar</Button>
              </div>

              {/* Mobile Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white p-8 transition-all duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-darkText">Menu</h2>

              <p className="text-slate-500 text-sm mt-1">Disty Akademi</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center"
            >
              <FaTimes className="text-darkText" />
            </button>
          </div>

          {/* Menu */}
          <div className="mt-12 flex flex-col gap-6">
            <a
              href="#"
              className="text-lg font-semibold text-darkText hover:text-primary transition"
            >
              Beranda
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-darkText hover:text-primary transition"
            >
              Program
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-darkText hover:text-primary transition"
            >
              Artikel
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-darkText hover:text-primary transition"
            >
              FAQ
            </a>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <Button className="w-full">Mulai Belajar</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
