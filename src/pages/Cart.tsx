import { useState } from "react";

type CartItem = { name: string; price: string; image: string; quantity: number };

type CartProps = {
    cart: CartItem[];
    onUpdateQuantity: (name: string, delta: number) => void;
    onRemove: (name: string) => void;
    onConfirmOrder: () => void;
};

function MinusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4">
            <path d="M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4">
            <path
                d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-.8 12.1a2 2 0 01-2 1.9H7.8a2 2 0 01-2-1.9L5 7h14z"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EmptyCartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-14 h-14 text-sage">
            <path
                d="M3 4h2l.4 2M7 13h10l3-8H6.4M7 13 5.4 6M7 13l-1.7 3.4A1 1 0 006.2 18H17M17 18a2 2 0 100 4 2 2 0 000-4ZM9 20a2 2 0 100 4 2 2 0 000-4Z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-14 h-14 text-sage-dark">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
            <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const parsePrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

export default function Cart({ cart, onUpdateQuantity, onRemove, onConfirmOrder }: CartProps) {
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleConfirm = () => {
        onConfirmOrder();
        setOrderConfirmed(true);
    };

    if (orderConfirmed) {
        return (
            <div className="px-6 pt-32 pb-20 max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
                <CheckIcon />
                <h1 className="font-heading text-4xl text-charcoal">Takk for din bestilling!</h1>
                <p className="font-body text-charcoal/70 max-w-md">
                    Vi setter sammen buketten din med omtanke, og gjør den klar så snart som mulig.
                </p>
            </div>
        );
    }

    return (
        <div className="px-6 pt-32 pb-20 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="font-heading text-4xl text-charcoal">Din handlekurv</h1>
                {cart.length > 0 && (
                    <p className="font-body text-sage-dark mt-2">
                        {itemCount} {itemCount === 1 ? "vare" : "varer"}
                    </p>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16">
                    <EmptyCartIcon />
                    <p className="font-body text-charcoal/70 text-center">
                        Handlekurven din er tom.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-5 bg-cream rounded-2xl p-4 shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-xl shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h2 className="font-heading text-lg text-charcoal truncate">{item.name}</h2>
                                <p className="font-body text-sage-dark text-sm mb-2">{item.price} / stk</p>

                                <div
                                    role="group"
                                    aria-label={`Velg antall for ${item.name}`}
                                    className="flex items-center gap-1 w-fit rounded-full border border-sage/50 bg-white p-1"
                                >
                                    <button
                                        type="button"
                                        onClick={() => onUpdateQuantity(item.name, -1)}
                                        className="flex items-center justify-center w-7 h-7 rounded-full text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                        aria-label={
                                            item.quantity === 1
                                                ? `Fjern ${item.name} fra handlekurv`
                                                : `Reduser antall for ${item.name}`
                                        }
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span
                                        className="font-body text-charcoal w-6 text-center text-sm tabular-nums"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => onUpdateQuantity(item.name, 1)}
                                        className="flex items-center justify-center w-7 h-7 rounded-full text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                        aria-label={`Øk antall for ${item.name}`}
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <p className="font-body text-charcoal font-semibold whitespace-nowrap">
                                    {parsePrice(item.price) * item.quantity} kr
                                </p>
                                <button
                                    type="button"
                                    onClick={() => onRemove(item.name)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full text-charcoal/40 cursor-pointer transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    aria-label={`Fjern ${item.name} fra handlekurv`}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 bg-white border border-sage/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <span className="font-body text-charcoal/70">Delsum</span>
                            <span className="font-body text-charcoal">{total} kr</span>
                        </div>
                        <div className="flex items-center justify-between mt-1 pb-4 border-b border-sage/20">
                            <span className="font-body text-charcoal/70">Frakt</span>
                            <span className="font-body text-sage-dark">Beregnes ved bestilling</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="font-heading text-lg text-charcoal">Totalt</span>
                            <span className="font-heading text-lg text-charcoal">{total} kr</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="w-full mt-6 bg-sage-dark text-black px-6 py-3.5 rounded-full font-body border-2 border-black/40 cursor-pointer hover:bg-green-100 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                        >
                            Bekreft bestilling
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}