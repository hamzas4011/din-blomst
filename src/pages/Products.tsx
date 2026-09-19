import { useState } from "react";
import { flowers } from "../data/flowers";

type SortimentProps = {
    onAddToCart: (flower: { name: string; price: string; image: string }, quantity: number) => void;
};

export default function Sortiment({ onAddToCart }: SortimentProps) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const getQuantity = (name: string) => quantities[name] ?? 1;

    const changeQuantity = (name: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [name]: Math.max(1, getQuantity(name) + delta),
        }));
    };

    return (
        <div className="px-8 pt-20 pb-16 max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-12">
                Vårt sortiment
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {flowers.map((flower) => (
                    <div key={flower.name} className="bg-cream rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                        <img
                            src={flower.image}
                            alt={flower.name}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="p-4 text-center">
                            <h2 className="font-heading text-xl text-charcoal">{flower.name}</h2>
                            <p className="font-body text-sage-dark mt-1">{flower.price}</p>
                            <div className="flex items-center justify-center gap-3 mt-3">
                                <button
                                    onClick={() => changeQuantity(flower.name, -1)}
                                    className="w-8 h-8 rounded-md bg-white border border-sage text-sage-dark cursor-pointer active:scale-95 transition-colors"
                                    aria-label="Reduser antall"
                                >
                                    -
                                </button>
                                <span className="font-body text-charcoal w-6 text-center">{getQuantity(flower.name)}</span>
                                <button
                                    onClick={() => changeQuantity(flower.name, 1)}
                                    className="w-8 h-8 rounded-md bg-white border border-sage text-sage-dark cursor-pointer active:scale-95 transition-colors"
                                    aria-label="Øk antall"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    onAddToCart(flower, getQuantity(flower.name));
                                    setQuantities((prev) => ({ ...prev, [flower.name]: 1 }));
                                }}
                                className="mt-3 bg-sage text-white px-4 py-2 rounded-md cursor-pointer hover:bg-sage-dark active:scale-95 transition-colors"
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