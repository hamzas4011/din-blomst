import { useState } from "react";
import { flowers } from "../data/flowers";
import FlowerAssistant from "../components/FlowerAssistant";

type SortimentProps = {
    onAddToCart: (flower: { name: string; price: string; image: string }, quantity: number) => void;
};

export default function Sortiment({ onAddToCart }: SortimentProps) {
    const [recommended, setRecommended] = useState<string[]>([]);

    return (
        <div className="px-8 pt-20 pb-16 max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-12">
                Vårt sortiment
            </h1>

            <FlowerAssistant onAddToCart={onAddToCart} onRecommend={setRecommended} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {flowers.map((flower) => (
                    <div
                        key={flower.name}
                        className={`relative bg-cream rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
                            recommended.includes(flower.name) ? "ring-2 ring-sage-dark ring-offset-2" : ""
                        }`}
                    >
                        {recommended.includes(flower.name) && (
                            <span className="absolute top-3 left-3 z-10 bg-sage-dark text-black text-xs font-body px-3 py-1 rounded-full border border-black/20">
                                Anbefalt
                            </span>
                        )}
                        <img
                            src={flower.image}
                            alt={flower.name}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="p-4 text-center">
                            <h2 className="font-heading text-xl text-charcoal">{flower.name}</h2>
                            <p className="font-body text-sage-dark mt-1">{flower.price}</p>
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
                ))}
            </div>
        </div>
    )
}