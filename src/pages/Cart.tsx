import { useState } from "react";
import { Link } from "react-router-dom";

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
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
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
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-14 h-14 text-sage-dark">
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

const primaryButton =
    "inline-block bg-sage-dark text-white px-6 py-3.5 rounded-full font-body font-medium cursor-pointer hover:bg-charcoal active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2";
const secondaryLink =
    "font-body text-sm text-sage-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark rounded";
const stepperButton =
    "flex items-center justify-center w-8 h-8 rounded-full text-gray-700 cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2";

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
            <div className="w-full px-6 pt-24 pb-20 max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
                <CheckIcon />
                <h1 className="font-heading text-4xl text-charcoal">Takk for din bestilling!</h1>
                <p className="font-body text-charcoal/70 max-w-md">
                    Vi gjør ordren din klar, og gir deg beskjed når den er klar.
                </p>
                <Link to="/sortiment" className={secondaryLink}>
                    Tilbake til sortimentet
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full px-6 pt-20 pb-20 max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="font-heading text-4xl text-charcoal">Din handlekurv</h1>
                {cart.length > 0 && (
                    <p className="font-body text-gray-500 mt-2">
                        {itemCount} {itemCount === 1 ? "vare" : "varer"}
                    </p>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16">
                    <EmptyCartIcon />
                    <p className="font-body text-gray-600 text-center">
                        Handlekurven din er tom.
                    </p>
                    <Link to="/sortiment" className={primaryButton}>
                        Se sortimentet
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
                    <ul className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <li
                            key={item.name}
                            className="flex gap-3 sm:gap-5 bg-white border border-gray-200 rounded-2xl p-3 sm:p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 min-[360px]:w-20 min-[360px]:h-20 sm:w-24 sm:h-24 object-cover rounded-xl shrink-0"
                            />

                            <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                                <div className="flex flex-col min-[360px]:flex-row min-[360px]:items-start justify-between gap-1 min-[360px]:gap-3">
                                    <div className="min-w-0">
                                        <h2 className="font-heading text-lg text-charcoal leading-snug wrap-break-word">{item.name}</h2>
                                        <p className="font-body text-gray-500 text-sm">{item.price} / stk</p>
                                    </div>
                                    <p className="font-body text-charcoal font-semibold whitespace-nowrap">
                                        {parsePrice(item.price) * item.quantity} kr
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                <div
                                    role="group"
                                    aria-label={`Velg antall for ${item.name}`}
                                    className="flex items-center gap-1 w-fit rounded-full border border-gray-300 bg-white p-1"
                                >
                                    <button
                                        type="button"
                                        onClick={() => onUpdateQuantity(item.name, -1)}
                                        className={stepperButton}
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
                                        className={stepperButton}
                                        aria-label={`Øk antall for ${item.name}`}
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemove(item.name)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 cursor-pointer transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    aria-label={`Fjern ${item.name} fra handlekurv`}
                                >
                                    <TrashIcon />
                                </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>

                    <aside
                        aria-labelledby="oppsummering-heading"
                        className="bg-sage-light border border-sage/30 rounded-2xl p-6 lg:sticky lg:top-6"
                    >
                        <h2 id="oppsummering-heading" className="font-heading text-xl text-charcoal mb-4">
                            Oppsummering
                        </h2>
                        <div className="flex items-center justify-between">
                            <span className="font-body text-gray-600">Delsum</span>
                            <span className="font-body text-charcoal">{total} kr</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pb-4 border-b border-sage/40">
                            <span className="font-body text-gray-600">Frakt</span>
                            <span className="font-body text-gray-600 text-sm">Beregnes ved bestilling</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="font-heading text-lg text-charcoal">Totalt</span>
                            <span className="font-heading text-xl font-semibold text-charcoal">{total} kr</span>
                        </div>

                        <button type="button" onClick={handleConfirm} className={`w-full mt-6 ${primaryButton}`}>
                            Bekreft bestilling
                        </button>
                        <Link to="/sortiment" className={`block text-center mt-2 py-2 ${secondaryLink}`}>
                            Fortsett å handle
                        </Link>
                    </aside>
                </div>
            )}
        </div>
    )
}