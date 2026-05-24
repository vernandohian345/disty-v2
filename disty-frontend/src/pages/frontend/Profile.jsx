import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaCamera,
  FaBookOpen,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";
import { getProfileStats } from "../../services/profileService";
import { getMyCertificates } from "../../services/SertifikatPelatihanService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_pelatihan: 0,
    pelatihan_selesai: 0,
    total_sertifikat: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");

    const fetchStats = async () => {
      try {
        const data = await getProfileStats();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();

    const fetchCertificates = async () => {
      try {
        const response = await getMyCertificates();

        setCertificates(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }

    fetchCertificates();

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    localStorage.setItem("profileImage", imageUrl);

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setProfileImage(imageUrl);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fffaf5] pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <button
          onClick={() => navigate(-1)}
          className="
    mb-6
    flex
    items-center
    gap-3
    px-5 py-3
    rounded-2xl
    bg-orange-300
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

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800">Profil Saya</h1>

          <p className="text-slate-500 mt-2">
            Kelola informasi akun dan pelatihan anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div
            className="
              bg-white
              rounded-[32px]
              p-8
              shadow-lg
              border
              border-slate-100
            "
          >
            <div className="flex flex-col items-center text-center">
              {/* IMAGE */}
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="
                      w-36 h-36
                      rounded-full
                      object-cover
                      border-4
                      border-orange-100
                    "
                  />
                ) : (
                  <div
                    className="
                      w-36 h-36
                      rounded-full
                      bg-orange-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaUserCircle className="text-orange-500" size={90} />
                  </div>
                )}

                <label
                  className="
                    absolute
                    bottom-2
                    right-2
                    w-10 h-10
                    rounded-full
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    transition
                  "
                >
                  <FaCamera />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* USER */}
              <h2 className="mt-6 text-2xl font-bold text-slate-800">
                {user.name}
              </h2>

              <p className="text-slate-500">{user.email}</p>

              <span
                className="
                  mt-4
                  px-4 py-2
                  rounded-full
                  bg-orange-100
                  text-orange-600
                  text-sm
                  font-semibold
                "
              >
                {user.role}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-8">
            {/* INFO */}
            <div
              className="
                bg-orange-300
                rounded-[32px]
                p-8
                shadow-lg
                border
                border-slate-100
              "
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Informasi Akun
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Nama Lengkap</p>

                  <div className="h-14 rounded-2xl bg-slate-100 px-4 flex items-center">
                    {user.name}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">Username</p>

                  <div className="h-14 rounded-2xl bg-slate-100 px-4 flex items-center">
                    {user.username}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>

                  <div className="h-14 rounded-2xl bg-slate-100 px-4 flex items-center">
                    {user.email}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">Nomor HP</p>

                  <div className="h-14 rounded-2xl bg-slate-100 px-4 flex items-center">
                    08123456789
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6">
              <div
                onClick={() => navigate("/my-pelatihan")}
                className="
                  bg-white
                  rounded-[28px]
                  p-6
                  shadow-lg
                  border
                  border-slate-100
                "
              >
                <FaBookOpen className="text-orange-500 mb-4" size={28} />

                <h3 className="text-3xl font-black text-slate-800">
                  {stats.total_pelatihan}
                </h3>

                <p className="text-slate-500 mt-2">Pelatihan Diikuti</p>
              </div>

              <div
                className="
                  bg-white
                  rounded-[28px]
                  p-6
                  shadow-lg
                  border
                  border-slate-100
                "
              >
                <FaCertificate className="text-orange-500 mb-4" size={28} />

                <h3 className="text-3xl font-black text-slate-800">
                  {stats.total_sertifikat}
                </h3>

                <p className="text-slate-500 mt-2">Sertifikat</p>
              </div>

              <div
                className="
                  bg-white
                  rounded-[28px]
                  p-6
                  shadow-lg
                  border
                  border-slate-100
                "
              >
                <FaCheckCircle className="text-orange-500 mb-4" size={28} />

                <h3 className="text-3xl font-black text-slate-800">
                  {stats.pelatihan_selesai}
                </h3>

                <p className="text-slate-500 mt-2">Selesai</p>
              </div>
            </div>

            {/* CERTIFICATES */}
            <div
              className="
    bg-white
    rounded-[32px]
    p-8
    shadow-lg
    border
    border-slate-100
  "
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Sertifikat Saya
              </h3>

              <div className="space-y-4">
                {certificates.length > 0 ? (
                  certificates.map((item) => (
                    <div
                      key={item.id}
                      className="
            flex
            items-center
            justify-between
            p-5
            rounded-2xl
            bg-slate-50
          "
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {item.title}
                        </h4>

                        <p className="text-sm text-slate-500">
                          Sertifikat tersedia
                        </p>
                      </div>

                      <button
                        className="
              px-5 py-2
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-semibold
              transition
            "
                      >
                        Download
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Belum ada sertifikat.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
