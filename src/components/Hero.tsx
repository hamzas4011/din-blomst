import flower1 from "../assets/flower-1.jpg";
import flower2 from "../assets/flower-2.jpg";
import flower3 from "../assets/flower-3.jpg";
import flower4 from "../assets/flower-4.jpg";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center gap-8 bg-cream px-4 py-12">
            <div className="text-center">
                <h1 className="font-heading text-5xl text-charcoal">Din Blomst</h1>
                <p className="font-body text-lg text-sage-dark mt-2">
                    Friske blomster, levert med omtanke
                </p>
            </div>

            <img
                src={flower1}
                alt="Red beautiful flower"
                className="w-full max-w-3xl h-400px object-cover rounded-lg shadow-md"
            />

            <div className="flex gap-4">
                <img src={flower2} alt="Flower" loading="lazy" className="w-32 h-32 object-cover rounded-md shadow-sm" />
                <img src={flower3} alt="Flower" loading="lazy" className="w-32 h-32 object-cover rounded-md shadow-sm" />
                <img src={flower4} alt="Flower" loading="lazy" className="w-32 h-32 object-cover rounded-md shadow-sm" />
            </div>
        </section>
    )
}