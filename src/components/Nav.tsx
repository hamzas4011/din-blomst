import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="bg-green-100 flex items-center justify-between px-8 py-4">
            <Link to="/" className="font-heading text-2xl text-black">
                Din Blomst
            </Link>
            <div className="flex gap-6">
                <Link
                    to="/om-oss"
                    className=" hover:text-green-500"
                >
                    Om oss
                </Link>
                <Link
                    to="/sortiment"
                    className=" hover:text-green-500"
                >
                    Sortiment
                </Link>
                <Link
                    to="/cart"
                    className=" hover:text-green-500"
                >
                    Handlekurv
                </Link>
            </div>
        </nav>
    )
}