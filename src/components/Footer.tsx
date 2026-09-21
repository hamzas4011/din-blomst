type FooterProps = {
    className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
    return (
        <footer className={`bg-green-100 flex flex-col items-center gap-2 px-8 py-6 text-center sm:flex-row sm:justify-between sm:text-left sm:gap-4 ${className}`}>
            <span className="font-heading text-lg text-charcoal">Din Blomst</span>
            <span className="font-body text-sage-dark break-all">post@dinblomst.no</span>
            <p className="font-body text-sm text-charcoal">© 2026 Din Blomst</p>
        </footer>
    )
}