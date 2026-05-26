import { Link } from "react-router-dom";

export default function PaymentPending() {

  return (

    <section className="
      min-h-screen
      bg-[#fffaf5]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        bg-white
        rounded-[40px]
        shadow-xl
        p-12
        max-w-xl
        w-full
        text-center
        border
        border-orange-100
      ">

        <div className="
          w-24
          h-24
          rounded-full
          bg-orange-100
          flex
          items-center
          justify-center
          mx-auto
        ">

          <span className="text-5xl">
            ⏳
          </span>
        </div>

        <h1 className="
          mt-8
          text-4xl
          font-black
          text-[#2B1D16]
        ">

          Pembayaran Pending

        </h1>

        <p className="
          mt-5
          text-slate-500
          leading-relaxed
        ">

          Pembayaran kamu masih menunggu
          penyelesaian.

          <br /><br />

          Setelah pembayaran berhasil,
          status akan otomatis berubah.
        </p>

        <div className="
          mt-10
          flex
          justify-center
        ">

          <Link
            to="/my-transactions"
            className="
              px-8
              py-4
              rounded-2xl
              bg-orange-500
              hover:bg-orange-400
              text-white
              font-bold
              shadow-lg
              transition
            "
          >

            Lihat Transaksi

          </Link>
        </div>
      </div>
    </section>
  );
}