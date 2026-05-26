import {
  useEffect,
  useState,
} from "react";

import {
  Clock3,
  CheckCircle2,
  Wallet,
  CreditCard,
  ArrowLeft,
  ReceiptText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function MyTransactions() {

  const navigate =
    useNavigate();

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("all");

  useEffect(() => {

  fetchData();

  const interval = setInterval(() => {

    fetchData();

  }, 5000);

  return () => clearInterval(interval);

}, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(

          "http://127.0.0.1:8000/api/my-transactions",

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );

      const result =
        await response.json();

      setData(result.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // FILTER
  const filteredData =
    activeTab === "all"

      ? data

      : data.filter(
          (item) =>
            item.status === activeTab
        );

  // COUNT
  const pendingCount =
    data.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const completedCount =
    data.filter(
      (item) =>
        item.status === "completed"
    ).length;

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#fffaf5]
      ">

        <div className="
          text-orange-500
          text-xl
          font-bold
          animate-pulse
        ">

          Loading...

        </div>
      </div>
    );
  }

  return (

    <section className="
      min-h-screen
      bg-gradient-to-b
      from-[#fffaf5]
      to-[#fff1e6]
      py-28
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* TOP BAR */}
        <div className="
          flex
          items-center
          justify-between
          gap-4
          flex-wrap
        ">

          {/* BACK BUTTON */}
          <button
            onClick={() =>
              navigate(-1)
            }
            className="
              flex
              items-center
              gap-3
              px-5
              py-3
              rounded-2xl
              bg-white
              border
              border-orange-100
              hover:bg-orange-50
              transition-all
              shadow-sm
            "
          >

            <ArrowLeft
              size={20}
              className="
                text-orange-500
              "
            />

            <span className="
              font-semibold
              text-slate-700
            ">

              Kembali

            </span>
          </button>

          {/* TOTAL */}
          <div className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-orange-100
            rounded-2xl
            px-6
            py-4
            shadow-sm
          ">

            <ReceiptText
              className="
                text-orange-500
              "
            />

            <div>

              <p className="
                text-sm
                text-slate-500
              ">

                Total Transaksi

              </p>

              <h2 className="
                text-2xl
                font-black
                text-[#2B1D16]
              ">

                {data.length}

              </h2>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="
          mt-10
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-8
        ">

          <div>

            <h1 className="
              text-5xl
              font-black
              text-[#2B1D16]
              leading-tight
            ">

              Pembayaran
              <br />

              Disty Academy

            </h1>

            <p className="
              mt-5
              text-slate-500
              text-lg
              max-w-2xl
            ">

              Kelola pembayaran
              pelatihan, cek status,
              dan lanjutkan pembayaran
              dengan mudah.

            </p>
          </div>

          {/* STATS */}
          <div className="
            grid
            grid-cols-2
            gap-5
          ">

            <div className="
              bg-white
              rounded-3xl
              p-6
              border
              border-orange-100
              min-w-[200px]
              shadow-sm
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-slate-500
                    text-sm
                  ">

                    Pending

                  </p>

                  <h2 className="
                    mt-2
                    text-4xl
                    font-black
                    text-orange-500
                  ">

                    {pendingCount}

                  </h2>
                </div>

                <div className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-orange-100
                  flex
                  items-center
                  justify-center
                ">

                  <Clock3
                    size={30}
                    className="
                      text-orange-500
                    "
                  />
                </div>
              </div>
            </div>

            <div className="
              bg-white
              rounded-3xl
              p-6
              border
              border-green-100
              min-w-[200px]
              shadow-sm
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-slate-500
                    text-sm
                  ">

                    Selesai

                  </p>

                  <h2 className="
                    mt-2
                    text-4xl
                    font-black
                    text-green-500
                  ">

                    {completedCount}

                  </h2>
                </div>

                <div className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                ">

                  <CheckCircle2
                    size={30}
                    className="
                      text-green-500
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB */}
        <div className="
          mt-14
          flex
          flex-wrap
          gap-4
        ">

          {[
            {
              key: "all",
              label: "Semua",
            },
            {
              key: "pending",
              label: "Pending",
            },
            {
              key: "completed",
              label: "Selesai",
            },
          ].map((tab) => (

            <button

              key={tab.key}

              onClick={() =>
                setActiveTab(
                  tab.key
                )
              }

              className={`
                px-7
                py-3.5
                rounded-2xl
                font-semibold
                transition-all
                ${
                  activeTab ===
                  tab.key

                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"

                    : "bg-white text-slate-600 border border-orange-100 hover:bg-orange-50"
                }
              `}
            >

              {tab.label}

            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="
          mt-12
          grid
          gap-7
        ">

          {filteredData.length ===
          0 ? (

            <div className="
              bg-white
              rounded-[32px]
              p-20
              text-center
              border
              border-orange-100
            ">

              <Wallet
                size={70}
                className="
                  mx-auto
                  text-orange-300
                "
              />

              <h2 className="
                mt-8
                text-3xl
                font-black
                text-[#2B1D16]
              ">

                Tidak Ada Transaksi

              </h2>

              <p className="
                mt-4
                text-slate-500
              ">

                Belum ada pembayaran
                yang tersedia.

              </p>
            </div>

          ) : (

            filteredData.map(
              (item) => (

                <div

                  key={item.id}

                  className="
                    bg-white
                    rounded-[32px]
                    border
                    border-orange-100
                    p-8
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >

                  <div className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-8
                  ">

                    {/* LEFT */}
                    <div>

                      <div className="
                        flex
                        items-start
                        gap-5
                      ">

                        <div className="
                          w-16
                          h-16
                          rounded-3xl
                          bg-orange-100
                          flex
                          items-center
                          justify-center
                          shrink-0
                        ">

                          <CreditCard
                            size={30}
                            className="
                              text-orange-500
                            "
                          />
                        </div>

                        <div>

                          <h2 className="
                            text-3xl
                            font-black
                            text-[#2B1D16]
                          ">

                            {
                              item
                              .pelatihan
                              .title
                            }

                          </h2>

                          <p className="
                            mt-3
                            text-slate-500
                          ">

                            Kode:
                            {" "}

                            <span className="
                              font-semibold
                            ">

                              {
                                item
                                .kode_transaksi
                              }

                            </span>
                          </p>

                          <div className="
                                mt-5
                                flex
                                flex-wrap
                                gap-3
                                ">

                                {/* STATUS */}
                                <div className={`
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-bold
                                    ${
                                    item.status ===
                                    "pending"

                                        ? "bg-orange-100 text-orange-600"

                                        : "bg-green-100 text-green-600"
                                    }
                                `}>

                                    {item.status}

                                </div>

                                {/* TOTAL */}
                                <div className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-700
                                    text-sm
                                    font-bold
                                ">

                                    Rp
                                    {" "}

                                    {
                                    Number(
                                        item.total_harga
                                    ).toLocaleString(
                                        "id-ID"
                                    )
                                    }

                                </div>

                                {/* PAYMENT TYPE */}
                                {
                                    item.payment_type && (

                                    <div className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-blue-100
                                        text-blue-600
                                        text-sm
                                        font-bold
                                    ">

                                        {item.payment_type}

                                    </div>
                                    )
                                }
                                </div>

                                {/* PAID DATE */}
                                {
                                item.paid_at && (
                                    <p className="
                                    mt-5
                                    text-slate-500
                                    font-medium
                                    ">

                                    Dibayar pada:
                                    {" "}

                                    {new Date(
                                        item.paid_at
                                    ).toLocaleString("id-ID")}

                                    </p>
                                )
                                }
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div>

                      {
                        item.status ===
                        "pending" && (

                          <button

                            onClick={async () => {

                              try {

                                const token =
                                  localStorage.getItem(
                                    "token"
                                  );

                                const response =
                                  await fetch(

                                    `http://127.0.0.1:8000/api/transaksi/repay/${item.id}`,

                                    {
                                      method:
                                        "POST",

                                      headers: {

                                        Authorization:
                                          `Bearer ${token}`,

                                        Accept:
                                          "application/json",
                                      },
                                    }
                                  );

                                const result =
                                  await response.json();

                                window.snap.pay(
                                  result.snap_token
                                );

                              } catch (error) {

                                console.log(
                                  error
                                );
                              }
                            }}

                            className="
                              px-8
                              py-4
                              rounded-2xl
                              bg-orange-500
                              hover:bg-orange-400
                              text-white
                              font-bold
                              text-lg
                              shadow-xl
                              shadow-orange-200
                              transition-all
                            "
                          >

                            Bayar Sekarang

                          </button>
                        )
                      }

                      {
                        item.status ===
                        "completed" && (

                          <div className="
                            px-7
                            py-4
                            rounded-2xl
                            bg-green-100
                            text-green-700
                            font-bold
                            text-lg
                          ">

                            Pembayaran
                            Selesai

                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}