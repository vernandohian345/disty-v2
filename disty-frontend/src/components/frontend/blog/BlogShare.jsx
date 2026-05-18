import { Share2 } from "lucide-react";

export default function BlogShare({ copied, handleCopyLink }) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 mb-6">
        <Share2 size={20} className="text-orange-500" />

        <h3 className="text-xl font-black text-slate-900">Bagikan Artikel</h3>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCopyLink}
          className="w-14 h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <Share2 size={22} />
        </button>
      </div>
      {copied && (
        <p className="text-sm text-green-500 mt-4 font-medium">
          Link berhasil disalin
        </p>
      )}
    </div>
  );
}
