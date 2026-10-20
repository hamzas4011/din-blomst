import { useState } from "react";
import { flowers, type Flower } from "../data/flowers";
import FlowerAssistant from "../components/FlowerAssistant";
import type { Recommendation } from "../lib/recommend";

type SortimentProps = {
    onAddToCart: (flower: { name: string; price: string; image: string }, quantity: number) => void;
};

export default function Sortiment({ onAddToCart }: SortimentProps) {
    const [recommended, setRecommended] = useState<Recommendation[]>([]);

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
                <p className="font-body text-sage-dark mt-1">{flower.price}</p>
                {reasonFor(flower.name) && (
                    <p className="font-body text-charcoal/70 text-sm mt-2">{reasonFor(flower.name)}</p>
                )}
                <button
                    type="button"
                    onClick={() => onAddToCart(flower, 1)}
                    className="mt-3 bg-sage-dark px-4 py-2 rounded-md border border-black/20 cursor-pointer hover:bg-green-100 hover:shadow-md active:bg-green-100 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                    aria-label={`Legg ${flower.name} i handlekurv`}
                >
                    Legg til i handlekurv
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-8 pt-20 pb-16 max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-12">
                Vårt sortiment
            </h1>

            <FlowerAssistant onRecommend={setRecommended} />

            {recommended.length > 0 && (
                <section aria-labelledby="anbefalt-heading" className="mb-16">
                    <h2 id="anbefalt-heading" className="font-heading text-2xl text-charcoal mb-6">
                        Anbefalt for deg
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherFlowers.map(renderCard)}
                </div>
            </section>
        </div>
    )
}
