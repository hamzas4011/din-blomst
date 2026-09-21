import { useState } from "react";
import { Link } from "react-router-dom";

type NavProps = {
    cartCount: number;
};

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-6 h-6">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-6 h-6">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

export default function Nav({ cartCount }: NavProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-green-100 px-8 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="font-heading text-2xl text-black" onClick={() => setMenuOpen(false)}>
                    Din Blomst
                </Link>
                <div className="hidden md:flex gap-6">
                    <Link to="/om-oss" className=" hover:text-green-500">
                        Om oss
                    </Link>
                    <Link to="/sortiment" className=" hover:text-green-500">
                        Sortiment
                    </Link>
                    <Link to="/handlekurv" className=" hover:text-green-500">
                        Handlekurv ({cartCount})
                    </Link>
                </div>
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="md:hidden flex items-center justify-center w-9 h-9 text-black"
                    aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 pt-4">
                    <Link to="/om-oss" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>
                        Om oss
                    </Link>
                    <Link to="/sortiment" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>
                        Sortiment
                    </Link>
                    <Link to="/handlekurv" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>
                        Handlekurv ({cartCount})
                    </Link>
                </div>
            )}
        </nav>
    )
}