import { forwardRef } from "react";

import bgSertifikat
from "../../../assets/sertifikat/background-pelatihan.png";

const SertifikatTemplate =
forwardRef(({

    data,

}, ref) => {

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
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    fontSize: "30px",
                    color: "#374151",
                    fontWeight: "bold",
                    fontFamily: "times new roman",
                }}
            >

                {data?.pelatihan
                    ?.title || "-"}

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

                Nomor Sertifikat:
                {" "}
                {data?.sertifikat_pelatihan || "-"}

            </div>

        </div>

    );

});

export default SertifikatTemplate;