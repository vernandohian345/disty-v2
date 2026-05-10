import kemnaker from "../../../assets/images/mitra/kemnamker.png";
import bnsp from "../../../assets/images/mitra/bnsp.png";
import lspmod from "../../../assets/images/mitra/lspmod.png";
import lspikn from "../../../assets/images/mitra/lspikn.png";
import blkjbg from "../../../assets/images/mitra/blkjbg.png";
import ui from "../../../assets/images/mitra/ui.png";
import bi from "../../../assets/images/mitra/bi.png";
import pln from "../../../assets/images/mitra/pln.png";
import winpo from "../../../assets/images/mitra/winpo.png";
import patri from "../../../assets/images/mitra/patri.png";
import uptblk from "../../../assets/images/mitra/uptblk.png";
import birawidha from "../../../assets/images/mitra/birawidha.png";
import dinasjbg from "../../../assets/images/mitra/dinasjbg.png";
import iain from "../../../assets/images/mitra/iain.png";
import unwaha from "../../../assets/images/mitra/unwaha.png";


export default function PartnerSection() {

    const partners = [
        kemnaker,
        bnsp,
        lspmod,
        lspikn,
        blkjbg,
        ui,
        bi,
        pln,
        winpo,
        patri,
        uptblk,
        birawidha,
        dinasjbg,
        iain,
        unwaha,
    ];

    return (
        <section className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="section-title">
                        Mitra & Klien
                    </h2>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center">

                    {partners.map((partner, index) => (

                        <div
                            className="col text-center"
                            key={index}
                        >
                            <div className="partner-logo">

                                <img
                                    src={partner}
                                    alt="Partner"
                                    className="img-fluid"
                                />

                            </div>
                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}