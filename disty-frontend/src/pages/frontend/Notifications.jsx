// src/pages/frontend/Notifications.jsx

import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import {
  FaBell,
  FaCheckCircle,
  FaArrowLeft,
  FaRegBell,
  FaBookOpen,
  FaCertificate,
  FaCreditCard,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/id";

import Navbar from "../../components/frontend/Navbar";

dayjs.extend(relativeTime);

dayjs.locale("id");

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [loading, setLoading] = useState(true);

  const [selectedNotif, setSelectedNotif] = useState(null);

  const [search, setSearch] = useState("");

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

  // =========================
  // MARK AS READ
  // =========================
  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://127.0.0.1:8000/api/notifications/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id
            ? {
                ...notif,
                is_read: true,
              }
            : notif,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const matchSearch =
        notif.title?.toLowerCase().includes(search.toLowerCase()) ||
        notif.message?.toLowerCase().includes(search.toLowerCase());

      if (activeTab === "read") {
        return notif.is_read && matchSearch;
      }

      if (activeTab === "unread") {
        return !notif.is_read && matchSearch;
      }

      return matchSearch;
    });
  }, [notifications, activeTab, search]);

  // =========================
  // ICON TYPE
  // =========================
  const renderIcon = (type, isRead) => {
    const baseClass = isRead
      ? "bg-green-100 text-green-500"
      : "bg-orange-100 text-orange-500";

    switch (type) {
      case "payment":
        return (
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${baseClass}`}
          >
            <FaCreditCard size={26} />
          </div>
        );

      case "sertifikat":
        return (
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${baseClass}`}
          >
            <FaCertificate size={26} />
          </div>
        );

      case "pelatihan":
        return (
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${baseClass}`}
          >
            <FaBookOpen size={26} />
          </div>
        );

      default:
        return (
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${baseClass}`}
          >
            {isRead ? <FaCheckCircle size={26} /> : <FaBell size={26} />}
          </div>
        );
    }
  };

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
      {/* CONTENT */}
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* HEADER */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              mb-12
            "
          >
            {/* LEFT */}
            <div>
              {/* BACK */}
              <button
                onClick={() => navigate(-1)}
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                  px-5 py-3
                  rounded-2xl
                  bg-white
                  hover:bg-orange-50
                  border
                  border-slate-200
                  shadow-sm
                  transition-all
                  text-slate-700
                  hover:text-orange-500
                  font-semibold
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

            {/* RIGHT ICON */}
            <div
              className="
                hidden lg:flex
                w-28 h-28
                rounded-[32px]
                bg-orange-100
                items-center
                justify-center
                
              "
            >
              <FaBell
                className="
                  text-orange-500
                "
                size={45}
              />
            </div>
          </div>

          {/* MAIN LAYOUT */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-4">
              <div
                className="
                  
                  top-28
                  space-y-6
                "
              >
                {/* SEARCH */}
                <div
                  className="
                    bg-white/90
                    backdrop-blur-xl
                    rounded-[28px]
                    p-6
                    shadow-lg
                    border
                    border-white/30
                  "
                >
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-slate-800
                      mb-5
                    "
                  >
                    Cari Notifikasi
                  </h3>

                  <input
                    type="text"
                    placeholder="Cari notifikasi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-5
                      outline-none
                      focus:ring-2
                      focus:ring-orange-300
                    "
                  />
                </div>

                {/* FILTER */}
                <div
                  className="
                    bg-white/90
                    backdrop-blur-xl
                    rounded-[28px]
                    p-6
                    shadow-lg
                    border
                    border-white/30
                  "
                >
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-slate-800
                      mb-5
                    "
                  >
                    Filter
                  </h3>

                  <div className="space-y-3">
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
                          w-full
                          flex
                          items-center
                          justify-between
                          px-5 py-4
                          rounded-2xl
                          text-sm
                          font-bold
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
                                  bg-slate-100
                                  text-slate-700
                                  hover:bg-orange-50
                                `
                          }
                        `}
                      >
                        <span>{tab.label}</span>

                        <FaBell size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-8">
              {/* LOADING */}
              {loading ? (
                <div className="grid gap-5">
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
                            rounded-[32px]
                            p-6
                            border
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-2xl
                            hover:border-orange-300
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
                            {renderIcon(notif.type, notif.is_read)}

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
                                  flex-col
                                  md:flex-row
                                  md:items-center
                                  md:justify-between
                                  gap-4
                                "
                              >
                                <span
                                  className="
                                    text-sm
                                    text-slate-400
                                  "
                                >
                                  {dayjs(notif.created_at).fromNow()}
                                </span>

                                <div className="flex items-center gap-3">
                                  {!notif.is_read && (
                                    <button
                                      onClick={() => handleMarkAsRead(notif.id)}
                                      className="
                                        text-sm
                                        font-semibold
                                        text-orange-500
                                        hover:text-orange-600
                                        transition
                                      "
                                    >
                                      Tandai Dibaca
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      setSelectedNotif(notif);

                                      if (!notif.is_read) {
                                        handleMarkAsRead(notif.id);
                                      }
                                    }}
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
      </div>

      {/* MODAL */}
      {selectedNotif && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            z-50
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-2xl
              bg-white
              rounded-[32px]
              p-8
              shadow-2xl
              relative
            "
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedNotif(null)}
              className="
                absolute
                top-5
                right-5
                w-10
                h-10
                rounded-full
                bg-slate-100
                hover:bg-slate-200
                flex
                items-center
                justify-center
                transition
              "
            >
              <FaTimes />
            </button>

            {/* TITLE */}
            <h2
              className="
                text-3xl
                font-black
                text-slate-800
                pr-10
              "
            >
              {selectedNotif.title}
            </h2>

            {/* DATE */}
            <p
              className="
                text-slate-400
                mt-3
              "
            >
              {dayjs(selectedNotif.created_at).format("DD MMMM YYYY HH:mm")}
            </p>

            {/* MESSAGE */}
            <div
              className="
                mt-8
                p-6
                rounded-3xl
                bg-slate-50
              "
            >
              <p
                className="
                  text-slate-700
                  leading-relaxed
                  text-lg
                "
              >
                {selectedNotif.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
