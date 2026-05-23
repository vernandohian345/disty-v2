import { FaInbox } from "react-icons/fa";

export default function EmptyState({
  title,
}) {
  return (
    <div
      className="
        bg-white
        rounded-[35px]
        p-14
        text-center
        shadow-lg
      "
    >
      <div
        className="
          w-24 h-24
          rounded-full
          bg-orange-100
          mx-auto
          flex
          items-center
          justify-center
        "
      >
        <FaInbox className="text-orange-500 text-3xl" />
      </div>

      <h1 className="mt-6 text-2xl font-black text-slate-800">
        Belum Ada {title}
      </h1>

      <p className="mt-2 text-slate-500">
        Data {title.toLowerCase()} belum tersedia
      </p>
    </div>
  );
}