import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Flower } from "../data/flowers";
import { getRecommendations, type Recommendation } from "../lib/recommend";

type FlowerAssistantProps = {
    onAddToCart: (flower: Flower, quantity: number) => void;
    onRecommend: (names: string[]) => void;
};

const suggestions = [
    { label: "Valentines", query: "Noe romantisk til valentines" },
    { label: "Bursdag", query: "En gave til bursdag" },
    { label: "Bryllup", query: "Blomster til bryllup" },
    { label: "Takk", query: "Si takk til noen" },
    { label: "God bedring", query: "God bedring" },
    { label: "Til hjemmet", query: "Noe til hjemmet som varer lenge" },
];

export default function FlowerAssistant({ onAddToCart, onRecommend }: FlowerAssistantProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Recommendation[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    // Lenken fra forsiden går til /sortiment#assistent, så vi setter fokus i feltet.
    useEffect(() => {
        if (location.hash === "#assistent") {
            inputRef.current?.focus();
        }
    }, [location.hash]);

    const search = async (text: string) => {
        if (!text.trim()) return;

        setStatus("loading");
        try {
            const recommendations = await getRecommendations(text);
            setResults(recommendations);
            onRecommend(recommendations.map(({ flower }) => flower.name));
            setStatus("done");
        } catch {
            setResults([]);
            onRecommend([]);
            setStatus("error");
        }
    };

    return (
        <section
            id="assistent"
            aria-labelledby="assistent-heading"
            className="bg-cream rounded-2xl shadow-md p-6 md:p-8 mb-12"
        >
            <h2 id="assistent-heading" className="font-heading text-2xl text-charcoal">
                Finn den perfekte blomsten
            </h2>
            <p className="font-body text-charcoal/70 mt-1">
                Fortell oss anledningen eller budsjettet, så foreslår vi noe som passer.
            </p>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    search(query);
                }}
                className="flex flex-col sm:flex-row gap-3 mt-5"
            >
                <label htmlFor="assistent-input" className="sr-only">
                    Hva leter du etter?
                </label>
                <input
                    id="assistent-input"
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    maxLength={200}
                    placeholder='F.eks. "Noe til valentines, rundt 300 kr"'
                    className="flex-1 rounded-full border border-sage/50 bg-white px-5 py-3 font-body text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-sage-dark px-6 py-3 rounded-full font-body border-2 border-black/40 cursor-pointer hover:bg-green-100 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                >
                    {status === "loading" ? "Leter…" : "Spør"}
                </button>
            </form>

            <div role="group" aria-label="Forslag til anledninger" className="flex flex-wrap gap-2 mt-4">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => {
                            setQuery(suggestion.query);
                            search(suggestion.query);
                        }}
                        className="rounded-full border border-sage/50 bg-white px-4 py-1.5 text-sm font-body text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                    >
                        {suggestion.label}
                    </button>
                ))}
            </div>

            <div aria-live="polite" className="mt-6">
                {status === "error" && (
                    <p className="font-body text-red-700">Noe gikk galt. Prøv igjen om litt.</p>
                )}

                {status === "done" && results.length === 0 && (
                    <p className="font-body text-charcoal/70">
                        Vi fant ingen treff. Prøv å beskrive anledningen, f.eks. bursdag, bryllup eller takk.
                    </p>
                )}

                {status === "done" && results.length > 0 && (
                    <>
                        <h3 className="font-heading text-lg text-charcoal mb-3">Anbefalt for deg</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {results.map(({ flower, reason }) => (
                                <li key={flower.name} className="flex md:flex-col gap-4 bg-white rounded-xl p-4 shadow-sm">
                                    <img
                                        src={flower.image}
                                        alt={flower.name}
                                        className="w-20 h-20 md:w-full md:h-40 object-cover rounded-lg shrink-0"
                                    />
                                    <div className="flex flex-col flex-1">
                                        <p className="font-heading text-charcoal">{flower.name}</p>
                                        <p className="font-body text-sage-dark text-sm">{flower.price}</p>
                                        <p className="font-body text-charcoal/70 text-sm mt-1">{reason}</p>
                                        <button
                                            type="button"
                                            onClick={() => onAddToCart(flower, 1)}
                                            className="mt-3 self-start bg-sage-dark px-4 py-2 rounded-md border border-black/20 text-sm cursor-pointer hover:bg-green-100 hover:shadow-md active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                                            aria-label={`Legg ${flower.name} i handlekurv`}
                                        >
                                            Legg i handlekurv
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </section>
    );
}
