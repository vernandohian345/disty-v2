// src/components/admin/pelatihan/DeleteModal.jsx

export default function DeleteModal({
    isOpen,
    onClose,
    onDelete,
    title,
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">

            <div className="w-full max-w-md bg-white rounded-[35px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* TOP */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 p-8 text-white text-center relative overflow-hidden">

                    <div className="absolute inset-0 opacity-20">

                        <div className="absolute w-52 h-52 bg-white rounded-full -top-20 -right-20 blur-3xl"></div>

                    </div>

                    <div className="relative z-10">

                        <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-5">

                            <i className="fas fa-trash text-4xl"></i>

                        </div>

                        <h2 className="text-3xl font-black">

                            Hapus Data

                        </h2>

                    </div>

                </div>

                {/* BODY */}
                <div className="p-8 text-center">

                    <h3 className="text-2xl font-bold text-slate-800">

                        Yakin ingin menghapus?

                    </h3>

                    <p className="text-slate-500 mt-3 leading-relaxed">

                        Data pelatihan
                        <span className="font-bold text-red-500">

                            {" "} {title} {" "}

                        </span>

                        akan dihapus permanen dan tidak dapat dikembalikan.

                    </p>

                    {/* BUTTON */}
                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 font-bold transition"
                        >

                            Batal

                        </button>

                        <button
                            onClick={onDelete}
                            className="flex-1 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-200 transition"
                        >

                            Hapus

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}