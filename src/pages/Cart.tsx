type CartProps = {
    cart: { name: string; price: string; image: string }[];
};

export default function Cart({ cart }: CartProps) {
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
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-cream rounded-lg p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div>
                                <h2 className="font-heading text-lg text-charcoal">{item.name}</h2>
                                <p className="font-body text-sage-dark">{item.price}</p>
                            </div>
                        </div>
                    ))}

                    <button className="mt-6 bg-sage text-white px-6 py-3 rounded-md hover:bg-sage-dark transition-colors">
                        Bekreft bestilling
                    </button>
                </div>
            )}
        </div>
    )
}