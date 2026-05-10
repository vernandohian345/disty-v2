// src/layouts/FrontendLayout.jsx

import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";

export default function FrontendLayout({ children }) {
    return (
        <>
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}