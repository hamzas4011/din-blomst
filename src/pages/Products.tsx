import { useState } from "react";
import { flowers, type Flower } from "../data/flowers";
import FlowerAssistant from "../components/FlowerAssistant";
import type { Recommendation } from "../lib/recommend";

type SortimentProps = {
    onAddToCart: (flower: { name: string; price: string; image: string }, quantity: number) => void;
};

export default function Sortiment({ onAddToCart }: SortimentProps) {
    const [recommended, setRecommended] = useState<Recommendation[]>([]);
    const [justAdded, setJustAdded] = useState<string | null>(null);

    // Viser «Lagt til» på knappen en kort stund, så man ser at trykket virket (særlig på mobil).
    const handleAdd = (flower: Flower) => {
        onAddToCart(flower, 1);
        setJustAdded(flower.name);
        setTimeout(() => setJustAdded((current) => (current === flower.name ? null : current)), 1500);
    };

    // Anbefalte blomster vises i egen seksjon, i rekkefølgen assistenten foreslo dem.
    const reasonFor = (name: string) => recommended.find(({ flower }) => flower.name === name)?.reason;
    const otherFlowers = flowers.filter((flower) => !reasonFor(flower.name));

    const renderCard = (flower: Flower) => (
        <div
            key={flower.name}
            className={`relative bg-cream rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
                reasonFor(flower.name) ? "ring-2 ring-sage-dark ring-offset-2" : ""
            }`}
        >
            <img
                src={flower.image}
                alt={flower.name}
                loading="lazy"
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4 text-center">
                <h3 className="font-heading text-xl text-charcoal">{flower.name}</h3>
                <p className="font-body font-semibold text-charcoal mt-1">{flower.price}</p>
                {reasonFor(flower.name) && (
                    <p className="font-body text-charcoal/70 text-sm mt-2">{reasonFor(flower.name)}</p>
                )}
                <button
                    type="button"
                    onClick={() => handleAdd(flower)}
                    className={`mt-3 min-w-48 px-5 py-2.5 rounded-full font-body text-white cursor-pointer active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 ${
                        justAdded === flower.name ? "bg-charcoal" : "bg-sage-dark hover:bg-charcoal"
                    }`}
                    aria-label={`Legg ${flower.name} i handlekurv`}
                >
                    {justAdded === flower.name ? "Lagt til ✓" : "Legg til i handlekurv"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-6 sm:px-8 pt-12 sm:pt-20 pb-16 max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-8 sm:mb-12">
                Vårt sortiment
            </h1>

            <FlowerAssistant onRecommend={setRecommended} />

            {recommended.length > 0 && (
                <section aria-labelledby="anbefalt-heading" className="mb-16">
                    <h2 id="anbefalt-heading" className="font-heading text-2xl text-charcoal mb-6">
                        Anbefalt for deg
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {recommended.map(({ flower }) => renderCard(flower))}
                    </div>
                </section>
            )}

            <section aria-labelledby={recommended.length > 0 ? "resten-heading" : undefined}>
                {recommended.length > 0 && (
                    <h2 id="resten-heading" className="font-heading text-2xl text-charcoal mb-6">
                        Resten av sortimentet
                    </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {otherFlowers.map(renderCard)}
                </div>
            </section>
        </div>
    )
}
