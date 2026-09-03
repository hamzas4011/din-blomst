export default function Nav() {
    return (
        <nav className="bg-green-100 flex items-center justify-between px-8 py-4">
            <span className="font-heading text-2xl text-charcoal">Din Blomst</span>
            <a href="#om-oss" className="font-body text-sage-dark hover:text-sage transition-colors">
                Om oss
            </a>
        </nav>
    )
}