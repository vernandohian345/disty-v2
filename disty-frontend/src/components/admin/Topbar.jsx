// src/components/admin/Topbar.jsx

export default function Topbar({ toggleSidebar }) {

    return (

        <header
            className="
                h-16
                bg-white/90
                backdrop-blur-xl
                border-b
                border-slate-200
                flex
                items-center
                px-6
                shadow-sm
            "
        >

            {/* HAMBURGER */}
            <button
                onClick={toggleSidebar}
                className="
                    lg:hidden
                    w-10
                    h-10
                    rounded-xl
                    hover:bg-slate-100
                    flex
                    items-center
                    justify-center
                    transition
                "
            >
                <i className="fas fa-bars"></i>
            </button>

            <h1 className="text-2xl font-bold text-slate-800 lg:ml-0 ml-4">
                Dashboard
            </h1>

        </header>
    );
}