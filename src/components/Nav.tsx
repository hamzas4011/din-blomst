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

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-6 h-6">
            <path
                d="M3 4h2l2.4 10.2a1 1 0 001 .8h9.2a1 1 0 001-.8L20 8H6.2M9 20a1 1 0 100-2 1 1 0 000 2Zm8 0a1 1 0 100-2 1 1 0 000 2Z"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Nav({ cartCount }: NavProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-sage-light px-6 sm:px-8 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="font-heading text-2xl text-black" onClick={() => setMenuOpen(false)}>
                    Din Blomst
                </Link>
                <div className="hidden md:flex gap-6">
                    <Link to="/sortiment" className="hover:text-sage-dark transition-colors">
                        Sortiment
                    </Link>
                    <Link to="/om-oss" className="hover:text-sage-dark transition-colors">
                        Om oss
                    </Link>
                    <Link to="/handlekurv" className="hover:text-sage-dark transition-colors">
                        Handlekurv ({cartCount})
                    </Link>
                </div>
                {/* På mobil vises handlekurven alltid, så man ser at varer blir lagt til. */}
                <div className="md:hidden flex items-center gap-2">
                    <Link
                        to="/handlekurv"
                        onClick={() => setMenuOpen(false)}
                        className="relative flex items-center justify-center w-10 h-10 text-black"
                        aria-label={`Handlekurv, ${cartCount} ${cartCount === 1 ? "vare" : "varer"}`}
                    >
                        <CartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-sage-dark text-white text-xs font-medium">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex items-center justify-center w-10 h-10 text-black"
                        aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col pt-2">
                    <Link to="/sortiment" className="py-3 border-b border-black/10 active:text-sage-dark" onClick={() => setMenuOpen(false)}>
                        Sortiment
                    </Link>
                    <Link to="/om-oss" className="py-3 border-b border-black/10 active:text-sage-dark" onClick={() => setMenuOpen(false)}>
                        Om oss
                    </Link>
                    <Link to="/handlekurv" className="py-3 active:text-sage-dark" onClick={() => setMenuOpen(false)}>
                        Handlekurv ({cartCount})
                    </Link>
                </div>
            )}
        </nav>
    )
}