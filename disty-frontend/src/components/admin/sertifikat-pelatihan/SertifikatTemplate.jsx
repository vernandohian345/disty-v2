import { forwardRef } from "react";

import bgSertifikat from "../../../assets/sertifikat/background-pelatihan.png";

const SertifikatTemplate = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "1600px",
        height: "1131px",
        position: "relative",
        overflow: "hidden",
        background: "white",
        fontFamily: "arial",
      }}
    >
      {/* BACKGROUND */}
      <img
        src={bgSertifikat}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* NAMA PESERTA */}
      <div
        style={{
          position: "absolute",
          top: "470px",
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: "52px",
          fontWeight: "bold",
          color: "#111827",
          fontFamily: "times new roman",
        }}
      >
        {data?.nama || "-"}
      </div>

      {/* PELATIHAN */}
      <div
        style={{
          position: "absolute",
          top: "690px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          textAlign: "center",
          fontSize: "28px",
          wordBreak: "break-word",
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "times new roman",
        }}
      >
        <p>
          Telah mengikuti dan menyelesaikan program Bootcamp{" "}
          {data?.pelatihan?.title || "-"} yang diselenggarakan oleh Disty
          Akademi dengan tingkat partisipasi dan pencapaian yang memuaskan.
          Sertifikat ini diberikan sebagai bentuk pengakuan atas dedikasi dan
          kesungguhan dalam menjalani seluruh rangkaian pelatihan.
        </p>
      </div>

      {/* NOMOR */}
      <div
        style={{
          position: "absolute",
          bottom: "35px",
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: "20px",
          color: "#6b7280",
        }}
      >
        Nomor Sertifikat: `Disty-{data?.pelatihan?.title}-${data.id}-$
        {new Date().getFullYear()}`
      </div>
    </div>
  );
});

export default SertifikatTemplate;
