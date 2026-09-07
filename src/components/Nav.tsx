import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="bg-green-100 flex items-center justify-between px-8 py-4">
            <Link to="/" className="font-heading text-2xl text-green-950">
                Din Blomst
            </Link>
            <div className="flex gap-6">
                <Link
                    to="/om-oss"
                    className="font-body text-green-950 hover:text-green-800 transition-colors underline underline-offset-4"
                >
                    Om oss
                </Link>
                <Link
                    to="/sortiment"
                    className="font-body text-green-950 hover:text-green-800 transition-colors underline underline-offset-4"
                >
                    Sortiment
                </Link>
                <Link
                    to="/cart"
                    className="font-body text-green-950 hover:text-green-800 transition-colors underline underline-offset-4"
                >
                    Handlekurv
                </Link>
            </div>
        </nav>
    )
}