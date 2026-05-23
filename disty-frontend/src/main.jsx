import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { HelmetProvider } from "react-helmet-async";
=======

>>>>>>> feat/kelola-sertifikasi-pelatihan

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "@fontsource/inter";

import "./index.css";
import "./assets/admin.css";
import "./styles/kalender.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
