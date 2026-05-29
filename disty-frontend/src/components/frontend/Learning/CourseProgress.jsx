import ReactPlayer from "react-player";
import {
  FaPlayCircle,
  FaClock,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";
export default function VideoPlayer({ module }) {
  // ========================================
  //  EMPTY STATE
  // ========================================

  if (!module) {
    return (
      <section className=" rounded-[36px] bg-white border border-black/5 p-10 text-center ">
        {" "}
        <h2 className=" text-3xl font-black text-[#2B1D16] ">
          {" "}
          Pilih Materi{" "}
        </h2>{" "}
        <p className=" mt-4 text-black/50 ">
          {" "}
          Pilih salah satu materi untuk mulai belajar.{" "}
        </p>{" "}
      </section>
    );
  }
  return (
    <section className=" rounded-[36px] bg-white border border-black/5 overflow-hidden shadow-sm ">
      {" "}
      {/* ======================================== VIDEO PLAYER ======================================== */}{" "}
      <div className=" relative aspect-video bg-black ">
        {" "}
        <ReactPlayer
          url={module.video || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          controls
          playing={false}
          width="100%"
          height="100%"
        />{" "}
      </div>{" "}
      {/* ======================================== CONTENT ======================================== */}{" "}
      <div className="p-8">
        {" "}
        {/* CATEGORY */}{" "}
        <div className=" inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold ">
          {" "}
          <FaPlayCircle /> <span>Materi Pembelajaran</span>{" "}
        </div>{" "}
        {/* TITLE */}{" "}
        <h1 className=" mt-5 text-4xl font-black text-[#2B1D16] leading-tight ">
          {" "}
          {module.title}{" "}
        </h1>{" "}
        {/* DESCRIPTION */}{" "}
        <p className=" mt-5 max-w-3xl text-black/55 leading-relaxed ">
          {" "}
          {module.materials?.[0] ||
            "Pelajari materi ini secara bertahap untuk meningkatkan pemahaman dan kemampuan praktik kamu."}{" "}
        </p>{" "}
        {/* ======================================== STATS ======================================== */}{" "}
        <div className=" grid md:grid-cols-3 gap-5 mt-10 ">
          {" "}
          {/* DURATION */}{" "}
          <div className=" rounded-3xl bg-[#faf7f4] p-5 ">
            {" "}
            <div className=" flex items-center gap-4 ">
              {" "}
              <div className=" w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-xl ">
                {" "}
                <FaClock />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className=" text-sm text-black/40 "> Durasi </p>{" "}
                <h3 className=" mt-1 text-xl font-black text-[#2B1D16] ">
                  {" "}
                  {module.duration}{" "}
                </h3>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* TYPE */}{" "}
          <div className=" rounded-3xl bg-[#faf7f4] p-5 ">
            {" "}
            <div className=" flex items-center gap-4 ">
              {" "}
              <div className=" w-14 h-14 rounded-2xl bg-[#2B1D16] flex items-center justify-center text-white text-xl ">
                {" "}
                <FaLayerGroup />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className=" text-sm text-black/40 "> Jenis Materi </p>{" "}
                <h3 className=" mt-1 text-xl font-black text-[#2B1D16] ">
                  {" "}
                  Video Learning{" "}
                </h3>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* STATUS */}{" "}
          <div className=" rounded-3xl bg-[#faf7f4] p-5 ">
            {" "}
            <div className=" flex items-center gap-4 ">
              {" "}
              <div className=" w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-xl ">
                {" "}
                <FaCheckCircle />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className=" text-sm text-black/40 "> Status </p>{" "}
                <h3 className=" mt-1 text-xl font-black text-[#2B1D16] ">
                  {" "}
                  Sedang Dipelajari{" "}
                </h3>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
