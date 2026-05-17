// src/pages/Notifications.jsx

import { useEffect, useState } from "react";

import axios from "axios";

import { FaBell, FaCheckCircle, FaArrowLeft, FaRegBell } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/frontend/Navbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setNotifications(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FILTER
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "read") {
      return notif.is_read;
    }

    if (activeTab === "unread") {
      return !notif.is_read;
    }

    return true;
  });

  return (
    <div
      className="
                min-h-screen
                bg-gradient-to-br
                from-slate-100
                via-white
                to-orange-50
            "
    >
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div
            className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-5
                            mb-10
                        "
          >
            {/* LEFT */}
            <div>
              <button
                onClick={() => navigate(-1)}
                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-slate-500
                                    hover:text-orange-500
                                    transition
                                    mb-5
                                "
              >
                <FaArrowLeft />

                <span>Kembali</span>
              </button>

              <h1
                className="
                                    text-4xl
                                    md:text-5xl
                                    font-black
                                    text-slate-800
                                    leading-tight
                                "
              >
                Notifikasi
              </h1>

              <p
                className="
                                    text-slate-500
                                    mt-3
                                    text-lg
                                "
              >
                Semua aktivitas akun dan pembaruan terbaru Anda
              </p>
            </div>

            {/* ICON */}
            <div
              className="
                                hidden md:flex
                                w-24 h-24
                                rounded-3xl
                                bg-orange-100
                                items-center
                                justify-center
                                shadow-lg
                                shadow-orange-200/50
                            "
            >
              <FaBell
                className="
                                    text-orange-500
                                "
                size={40}
              />
            </div>
          </div>

          {/* TAB */}
          <div
            className="
                            flex
                            items-center
                            gap-3
                            overflow-x-auto
                            mb-10
                        "
          >
            {[
              {
                key: "all",
                label: "Semua",
              },
              {
                key: "unread",
                label: "Belum Dibaca",
              },
              {
                key: "read",
                label: "Sudah Dibaca",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                                    px-6 py-3
                                    rounded-2xl
                                    text-sm
                                    font-bold
                                    whitespace-nowrap
                                    transition-all
                                    duration-300
                                    ${
                                      activeTab === tab.key
                                        ? `
                                                bg-orange-500
                                                text-white
                                                shadow-lg
                                                shadow-orange-500/30
                                              `
                                        : `
                                                bg-white
                                                text-slate-700
                                                hover:bg-orange-50
                                              `
                                    }
                                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading ? (
            <div
              className="
                                grid
                                gap-5
                            "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                                            h-36
                                            rounded-3xl
                                            bg-white
                                            animate-pulse
                                        "
                ></div>
              ))}
            </div>
          ) : (
            <>
              {/* LIST */}
              <div className="space-y-5">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`
                                                    group
                                                    bg-white/90
                                                    backdrop-blur-xl
                                                    rounded-3xl
                                                    p-6
                                                    border
                                                    transition-all
                                                    duration-300
                                                    hover:-translate-y-1
                                                    hover:shadow-2xl
                                                    ${
                                                      notif.is_read
                                                        ? `
                                                                border-slate-200
                                                              `
                                                        : `
                                                                border-orange-300
                                                                shadow-lg
                                                                shadow-orange-100
                                                              `
                                                    }
                                                `}
                    >
                      <div className="flex gap-5">
                        {/* ICON */}
                        <div
                          className={`
                                                            w-16
                                                            h-16
                                                            rounded-2xl
                                                            flex
                                                            items-center
                                                            justify-center
                                                            shrink-0
                                                            ${
                                                              notif.is_read
                                                                ? `
                                                                        bg-green-100
                                                                      `
                                                                : `
                                                                        bg-orange-100
                                                                      `
                                                            }
                                                        `}
                        >
                          {notif.is_read ? (
                            <FaCheckCircle
                              className="
                                                                    text-green-500
                                                                "
                              size={28}
                            />
                          ) : (
                            <FaBell
                              className="
                                                                    text-orange-500
                                                                "
                              size={26}
                            />
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">
                          <div
                            className="
                                                                flex
                                                                flex-col
                                                                md:flex-row
                                                                md:items-start
                                                                md:justify-between
                                                                gap-4
                                                            "
                          >
                            <div>
                              <h3
                                className="
                                                                        text-xl
                                                                        font-bold
                                                                        text-slate-800
                                                                    "
                              >
                                {notif.title}
                              </h3>

                              <p
                                className="
                                                                        text-slate-600
                                                                        mt-3
                                                                        leading-relaxed
                                                                    "
                              >
                                {notif.message}
                              </p>
                            </div>

                            {!notif.is_read && (
                              <span
                                className="
                                                                        px-4
                                                                        py-2
                                                                        rounded-full
                                                                        bg-orange-100
                                                                        text-orange-600
                                                                        text-xs
                                                                        font-bold
                                                                        whitespace-nowrap
                                                                    "
                              >
                                Baru
                              </span>
                            )}
                          </div>

                          {/* FOOTER */}
                          <div
                            className="
                                                                mt-6
                                                                flex
                                                                items-center
                                                                justify-between
                                                                gap-4
                                                            "
                          >
                            <span
                              className="
                                                                    text-sm
                                                                    text-slate-400
                                                                "
                            >
                              {notif.created_at}
                            </span>

                            <button
                              className="
                                                                    px-5
                                                                    py-2.5
                                                                    rounded-xl
                                                                    bg-orange-500
                                                                    hover:bg-orange-600
                                                                    text-white
                                                                    text-sm
                                                                    font-semibold
                                                                    transition
                                                                "
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="
                                            bg-white
                                            rounded-[32px]
                                            p-20
                                            text-center
                                            shadow-xl
                                        "
                  >
                    <div
                      className="
                                                w-28
                                                h-28
                                                rounded-full
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                mx-auto
                                            "
                    >
                      <FaRegBell
                        className="
                                                    text-slate-300
                                                "
                        size={50}
                      />
                    </div>

                    <h3
                      className="
                                                mt-8
                                                text-3xl
                                                font-black
                                                text-slate-700
                                            "
                    >
                      Tidak Ada Notifikasi
                    </h3>

                    <p
                      className="
                                                text-slate-400
                                                mt-3
                                                text-lg
                                            "
                    >
                      Semua notifikasi akan muncul di sini
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
