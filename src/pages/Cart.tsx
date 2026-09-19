type CartItem = { name: string; price: string; image: string; quantity: number };

type CartProps = {
    cart: CartItem[];
    onUpdateQuantity: (name: string, delta: number) => void;
    onRemove: (name: string) => void;
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

const parsePrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

export default function Cart({ cart, onUpdateQuantity, onRemove }: CartProps) {
    const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

    return (
        <div className="px-8 pt-32 pb-16 max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-12">
                Din handlekurv
            </h1>

            {cart.length === 0 ? (
                <p className="font-body text-charcoal text-center">
                    Handlekurven din er tom.
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-4 bg-cream rounded-lg p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h2 className="font-heading text-lg text-charcoal">{item.name}</h2>
                                <p className="font-body text-sage-dark">{item.price}</p>

                                <div
                                    role="group"
                                    aria-label={`Velg antall for ${item.name}`}
                                    className="flex items-center gap-1 mt-2 w-fit rounded-full border border-sage bg-white p-1"
                                >
                                    <button
                                        type="button"
                                        onClick={() => onUpdateQuantity(item.name, -1)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                        aria-label={
                                            item.quantity === 1
                                                ? `Fjern ${item.name} fra handlekurv`
                                                : `Reduser antall for ${item.name}`
                                        }
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span
                                        className="font-body text-charcoal w-6 text-center tabular-nums"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => onUpdateQuantity(item.name, 1)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full text-sage-dark cursor-pointer transition-colors hover:bg-sage/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                        aria-label={`Øk antall for ${item.name}`}
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                            </div>

                            <p className="font-body text-charcoal font-medium whitespace-nowrap">
                                {parsePrice(item.price) * item.quantity} kr
                            </p>

                            <button
                                type="button"
                                onClick={() => onRemove(item.name)}
                                className="flex items-center justify-center w-9 h-9 rounded-full text-charcoal/60 cursor-pointer transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                aria-label={`Fjern ${item.name} fra handlekurv`}
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))}

                    <div className="flex items-center justify-between mt-2 px-2">
                        <span className="font-body text-charcoal font-medium">Totalt</span>
                        <span className="font-body text-charcoal font-semibold">{total} kr</span>
                    </div>

                    <button
                        type="button"
                        className="mt-4 bg-sage text-white px-6 py-3 rounded-md cursor-pointer hover:bg-sage-dark active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2"
                    >
                        Bekreft bestilling
                    </button>
                </div>
            )}
        </div>
    )
}