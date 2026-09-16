import { Link } from "react-router-dom";

type NavProps = {
    cartCount: number;
};

export default function Nav({ cartCount }: NavProps) {
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
                    to="/handlekurv"
                    className=" hover:text-green-500"
                >
                    Handlekurv ({cartCount})
                </Link>
            </div>
        </nav>
    )
}