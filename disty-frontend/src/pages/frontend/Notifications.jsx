// Notifications.jsx
// Modern Minimalist Version

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Bell,
  BellRing,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

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

      setNotifications(response.data.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        prev.map((item) =>
          item.id === id ? { ...item, is_read: true } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

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

  const renderIcon = (type, isRead) => {
    const wrapper = isRead
      ? "bg-slate-100 text-slate-500"
      : "bg-orange-50 text-orange-500";

    const icons = {
      payment: <CreditCard size={18} />,
      sertifikat: <GraduationCap size={18} />,
      pelatihan: <BookOpen size={18} />,
    };

    return (
      <div
        className={`
          w-11 h-11
          rounded-xl
          flex items-center justify-center
          shrink-0
          ${wrapper}
        `}
      >
        {icons[type] ||
          (isRead ? <CheckCircle2 size={18} /> : <BellRing size={18} />)}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-5 flex items-center gap-2 h-10 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition"
              >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Kembali</span>
              </button>

              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                Notifikasi
              </h1>

              <p className="mt-2 text-slate-500">
                Semua aktivitas akun dan pembaruan terbaru.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-400">
              <Bell size={18} />
              <span className="text-sm">Notification Center</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Cari Notifikasi
                </h3>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Cari notifikasi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Filter
                </h3>

                <div className="space-y-2">
                  {[
                    { key: "all", label: "Semua" },
                    { key: "unread", label: "Belum Dibaca" },
                    { key: "read", label: "Sudah Dibaca" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`
                      w-full h-10 px-4 rounded-xl
                      flex items-center justify-between
                      text-sm font-medium transition
                      ${
                        activeTab === tab.key
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }
                    `}
                    >
                      {tab.label}
                      <Bell size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-28 rounded-2xl bg-white animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                  {filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`
                      bg-white
                      border
                      rounded-2xl
                      p-5
                      transition
                      ${
                        notif.is_read ? "border-slate-200" : "border-orange-200"
                      }
                    `}
                    >
                      <div className="flex gap-4">
                        {renderIcon(notif.type, notif.is_read)}

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between gap-3">
                            <div>
                              <h3 className="text-base font-semibold text-slate-900">
                                {notif.title}
                              </h3>

                              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                {notif.message}
                              </p>
                            </div>

                            {!notif.is_read && (
                              <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium h-fit">
                                Baru
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <span className="text-xs text-slate-400">
                              {dayjs(notif.created_at).fromNow()}
                            </span>

                            <div className="flex items-center gap-2">
                              {!notif.is_read && (
                                <button
                                  onClick={() => handleMarkAsRead(notif.id)}
                                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
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
                                className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-medium transition"
                              >
                                Detail
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Bell size={40} className="mx-auto text-slate-300" />

                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    Tidak Ada Notifikasi
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Semua notifikasi akan muncul di sini.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedNotif && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedNotif(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
              >
                <X size={18} />
              </button>

              <h2 className="text-2xl font-semibold text-slate-900 pr-10">
                {selectedNotif.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {dayjs(selectedNotif.created_at).format("DD MMMM YYYY HH:mm")}
              </p>

              <div className="mt-6 p-5 rounded-2xl bg-slate-50">
                <p className="text-slate-700 leading-relaxed">
                  {selectedNotif.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
