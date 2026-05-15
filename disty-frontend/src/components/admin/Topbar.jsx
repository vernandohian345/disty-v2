// src/components/admin/Topbar.jsx

export default function Topbar({ toggleSidebar }) {

    return (
        <header className="bg-white shadow-sm h-16 px-4 flex items-center gap-4 sticky top-0 z-30">

            {/* HAMBURGER */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
            >

                <i className="fas fa-bars"></i>

            </button>

            {/* TITLE */}
            <h1 className="text-xl font-bold text-slate-800 m-0">
                Dashboard
            </h1>

        </header>
    );
}