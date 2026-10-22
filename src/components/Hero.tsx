import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flower1 from "../assets/flower-1.jpg";
import { suggestions } from "../data/suggestions";

const heroSuggestions = suggestions.slice(0, 4);

export default function Hero() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // Sender spørsmålet videre til assistenten på sortimentsiden, som søker automatisk.
    const ask = (text: string) => {
        if (!text.trim()) return;
        navigate(`/sortiment?q=${encodeURIComponent(text.trim())}#assistent`);
    };

    return (
        <section className="bg-cream flex-1 flex items-center">
            <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-20 grid gap-10 md:grid-cols-2 md:gap-12 items-center">
                <div className="text-center md:text-left">
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight text-balance">
                        Blomster levert
                        <span className="block">
                            med omtanke
                        </span>
                    </h1>
                    <p className="font-body text-lg text-charcoal/80 mt-4 max-w-md mx-auto md:mx-0">
                        Håndlagde buketter til hverdag og fest.
                    </p>

                    <div className="bg-white rounded-2xl border border-sage/40 shadow-lg p-5 mt-8 text-left">
                        <p className="inline-flex items-center gap-1.5 rounded-full bg-sage-dark px-3 py-1 text-sm font-body font-semibold text-white">
                            <span aria-hidden="true">🤖</span> AI-assistent
                        </p>

                        <label htmlFor="hero-assistent-input" className="sr-only">
                            Hva leter du etter?
                        </label>
                        <p id="hero-assistent-hjelp" className="font-body text-sm text-charcoal/70 mt-3">
                            Skriv fritt: anledning, hvem det er til, farger eller budsjett.
                        </p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                ask(query);
                            }}
                            className="flex flex-col sm:flex-row gap-3 mt-3"
                        >
                            <input
                                id="hero-assistent-input"
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                maxLength={200}
                                aria-describedby="hero-assistent-hjelp"
                                placeholder='F.eks. "rosa til mamma, 400 kr"'
                                className="flex-1 min-w-0 rounded-full border border-sage-dark/70 bg-white px-5 py-3 font-body text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark"
                            />
                            <button
                                type="submit"
                                className="bg-sage-dark text-white px-6 py-3 rounded-full font-body cursor-pointer hover:bg-charcoal active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                            >
                                Spør
                            </button>
                        </form>

                        <div role="group" aria-label="Eksempler du kan prøve" className="flex flex-wrap gap-2 mt-3">
                            {heroSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.label}
                                    type="button"
                                    onClick={() => ask(suggestion.query)}
                                    className="rounded-full border border-sage/50 bg-white px-4 py-1.5 text-sm font-body text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                                >
                                    {suggestion.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link
                        to="/sortiment"
                        className="inline-block mt-5 font-body text-charcoal underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 rounded"
                    >
                        Se hele sortimentet →
                    </Link>
                </div>

                <img
                    src={flower1}
                    alt="Rosa tulipan mot lys rosa bakgrunn"
                    className="w-full max-w-sm md:max-w-md mx-auto aspect-4/3 md:aspect-square object-cover rounded-3xl shadow-md"
                />
            </div>
        </section>
    )
}
