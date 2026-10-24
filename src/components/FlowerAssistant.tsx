import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getRecommendations, type Recommendation } from "../lib/recommend";
import { suggestions } from "../data/suggestions";
import flower1 from "../assets/flower-1.jpg";

type FlowerAssistantProps = {
    onRecommend: (recommendations: Recommendation[]) => void;
};

export default function FlowerAssistant({ onRecommend }: FlowerAssistantProps) {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") ?? "";
    const [query, setQuery] = useState(initialQuery);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const inputRef = useRef<HTMLInputElement>(null);
    const lastAutoQuery = useRef<string | null>(null);
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
            setCount(recommendations.length);
            onRecommend(recommendations);
            setStatus("done");
        } catch {
            setCount(0);
            onRecommend([]);
            setStatus("error");
        }
    };

    // Spørsmål fra forsiden kommer som ?q=..., så vi søker med en gang.
    // Ref-en hindrer dobbelt søk når effekten kjøres to ganger i StrictMode.
    useEffect(() => {
        if (!initialQuery || lastAutoQuery.current === initialQuery) return;
        lastAutoQuery.current = initialQuery;
        setQuery(initialQuery);
        search(initialQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery]);

    return (
        <section
            id="assistent"
            aria-labelledby="assistent-heading"
            className="bg-cream rounded-2xl shadow-md p-6 md:p-8 mb-12"
        >
            <div className="flex items-center gap-6 md:gap-3">
                {/* Samme blomsterikon som på forsiden, så assistenten ser lik ut på mobil. */}
                <img
                    src={flower1}
                    alt=""
                    className="md:hidden w-14 h-14 shrink-0 rounded-full object-cover ring-2 ring-sage-light"
                />
                <p className="inline-flex items-center gap-1.5 rounded-full bg-sage-dark px-3 py-1 text-sm font-body font-semibold text-white">
                    <span aria-hidden="true" className="hidden md:inline">🤖</span> AI-assistent
                </p>
            </div>
            <h2 id="assistent-heading" className="font-heading text-2xl text-charcoal mt-3">
                Finn den perfekte blomsten
            </h2>
            <p id="assistent-hjelp" className="font-body text-charcoal/70 mt-1">
                Skriv fritt: anledning, hvem det er til, farger eller budsjett.
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
                    aria-describedby="assistent-hjelp"
                    placeholder='F.eks. "rosa til mamma, 400 kr"'
                    className="flex-1 rounded-full border border-sage-dark/70 bg-white px-5 py-3 font-body text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-sage-dark text-white px-6 py-3 rounded-full font-body cursor-pointer hover:bg-charcoal active:scale-95 transition-all disabled:opacity-60 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                >
                    {status === "loading" ? "Leter…" : "Spør"}
                </button>
            </form>

            <div role="group" aria-label="Eksempler du kan prøve" className="flex flex-wrap gap-2 mt-4">
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

                {status === "done" && count === 0 && (
                    <p className="font-body text-charcoal/70">
                        Vi fant ingen treff. Prøv å beskrive anledningen, f.eks. bursdag, bryllup eller takk.
                    </p>
                )}

                {status === "done" && count > 0 && (
                    <p className="font-body text-charcoal">
                        Vi fant {count} forslag til deg. Se «Anbefalt for deg» under.
                    </p>
                )}
            </div>
        </section>
    );
}
