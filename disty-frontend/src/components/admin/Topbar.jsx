export default function Topbar({ toggleSidebar }) {
    return (
        <div className="topbar">

            <button
                className="toggle-btn"
                onClick={toggleSidebar}
            >
                <i className="fas fa-bars"></i>
            </button>

            <h4>Dashboard</h4>

        </div>
    );
}