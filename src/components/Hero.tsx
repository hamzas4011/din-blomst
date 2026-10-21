import { Link } from "react-router-dom";
import flower1 from "../assets/flower-1.jpg";

export default function Hero() {
    return (
        <section className="bg-cream flex-1 flex items-center">
            <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-20 grid gap-10 md:grid-cols-2 md:gap-12 items-center">
                <div className="text-center md:text-left">
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight">
                        Friske blomster, levert med omtanke
                    </h1>
                    <p className="font-body text-lg text-charcoal/80 mt-4 max-w-md mx-auto md:mx-0">
                        Håndlagde buketter av sesongens blomster, til hverdag og fest.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center md:justify-start">
                        <Link
                            to="/sortiment"
                            className="bg-sage-dark text-white px-6 py-3 rounded-full font-body text-center hover:bg-charcoal active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                        >
                            Se sortimentet
                        </Link>
                        <Link
                            to="/sortiment#assistent"
                            className="bg-white text-sage-dark border border-sage-dark/70 px-6 py-3 rounded-full font-body text-center hover:bg-sage-light active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                        >
                            Spør blomsterassistenten
                        </Link>
                    </div>
                </div>

                <img
                    src={flower1}
                    alt="Rosa tulipan mot lys rosa bakgrunn"
                    className="w-full max-w-sm md:max-w-md mx-auto aspect-[4/3] md:aspect-square object-cover rounded-3xl shadow-md"
                />
            </div>
        </section>
    )
}
