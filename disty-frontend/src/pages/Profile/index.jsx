import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
} from "react-icons/fa";

import ProfileService from "../../services/ProfileService";

import ProfileHeader from "../../components/profile/ProfileHeader";

import ProfileInfo from "../../components/profile/ProfileInfo";

import ProfilePelatihan from "../../components/profile/ProfilePelatihan";

import ProfileSertifikasi from "../../components/profile/ProfileSertifikasi";

import EditProfileModal from "../../components/profile/EditProfileModal";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  const [pelatihan, setPelatihan] =
    useState([]);

  const [sertifikasi, setSertifikasi] =
    useState([]);

  const [editOpen, setEditOpen] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await ProfileService.getProfile();

      setUser(response.data.user);

      setPelatihan(
        response.data
          .transaksi_pelatihan
      );

      setSertifikasi(
        response.data
          .transaksi_sertifikasi
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    formData
  ) => {
    try {
      const response =
        await ProfileService.updateProfile(
          formData
        );

      setUser(response.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-orange-50
        to-slate-200
        pt-32
        px-5
        pb-10
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="
            mb-6
            flex
            items-center
            gap-3
            px-5
            py-3
            bg-white
            rounded-2xl
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          <FaArrowLeft />

          Kembali
        </button>

        {/* HEADER */}
        <ProfileHeader
          user={user}
          pelatihan={pelatihan}
          sertifikasi={sertifikasi}
          onEdit={() =>
            setEditOpen(true)
          }
        />

        {/* INFO */}
        <ProfileInfo user={user} />

        {/* PELATIHAN */}
        <ProfilePelatihan
          pelatihan={pelatihan}
        />

        {/* SERTIFIKASI */}
        <ProfileSertifikasi
          sertifikasi={sertifikasi}
        />

        {/* MODAL */}
        <EditProfileModal
          open={editOpen}
          user={user}
          onClose={() =>
            setEditOpen(false)
          }
          onSave={handleUpdate}
        />
      </div>
    </div>
  );
}