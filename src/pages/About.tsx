import { Link } from "react-router-dom";
import shop from "../assets/shop.jpg";

const values = [
    {
        title: "Familiebedrift",
        text: "Drevet med kjærlighet gjennom generasjoner, helt siden 1972.",
    },
    {
        title: "Laget for hånd",
        text: "Hver bukett settes sammen for hånd, med god tid.",
    },
    {
        title: "Friske sesongblomster",
        text: "Vi velger hver stilk med samme omtanke som den gang.",
    },
];

export default function About() {
    return (
        <div className="w-full px-6 sm:px-8 pt-12 sm:pt-20 pb-20 max-w-5xl mx-auto">
            <header className="text-center mb-10 sm:mb-14">
                <p className="font-body text-sm uppercase tracking-widest text-sage-dark">Siden 1972</p>
                <h1 className="font-heading text-4xl sm:text-5xl text-charcoal mt-2">Om oss</h1>
            </header>

            <section className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                <img
                    src={shop}
                    alt="Blomster og planter i Din Blomst-butikken"
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
                />
                <div>
                    <h2 className="font-heading text-2xl sm:text-3xl text-charcoal mb-4">
                        Fra liten blomsterbod til butikken vi er i dag
                    </h2>
                    <p className="font-body text-charcoal/80 leading-relaxed mb-4">
                        Din Blomst har vært en familiebedrift siden 1972.
                        Det som startet som en liten blomsterbod drevet med kjærlighet gjennom generasjoner,
                        har vokst til en butikk vi er stolte av i dag.
                        Fortsatt velges hver stilk med samme omtanke som den gang.
                    </p>
                    <p className="font-body text-charcoal/80 leading-relaxed">
                        Hver bukett settes sammen for hånd med friske sesongblomster og god tid.
                        Vi tror ikke på hastverk når det kommer til blomster som skal bety noe.
                    </p>
                </div>
            </section>

            <ul className="grid gap-4 sm:grid-cols-3 mt-14 sm:mt-20">
                {values.map((value) => (
                    <li key={value.title} className="bg-cream border border-sage/40 rounded-2xl p-6">
                        <h3 className="font-heading text-lg text-charcoal">{value.title}</h3>
                        <p className="font-body text-sm text-charcoal/80 mt-2 leading-relaxed">{value.text}</p>
                    </li>
                ))}
            </ul>

            <blockquote className="mt-14 sm:mt-20 text-center max-w-2xl mx-auto">
                <p className="font-heading text-xl sm:text-2xl text-charcoal leading-relaxed">
                    «Enten det er en bukett til deg selv en helt vanlig tirsdag, eller en gave til noen som
                    betyr mye, ønsker vi at hver blomst skal fortelle en historie.»
                </p>
            </blockquote>

            <div className="text-center mt-10">
                <Link
                    to="/sortiment"
                    className="inline-block bg-sage-dark text-white px-6 py-3 rounded-full font-body hover:bg-charcoal active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                >
                    Se sortimentet
                </Link>
            </div>
        </div>
    )
}
