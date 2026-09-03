import flower1 from "../assets/flower-1.jpg";
import flower2 from "../assets/flower-2.jpg";
import flower3 from "../assets/flower-3.jpg";
import flower4 from "../assets/flower-4.jpg";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center gap-6 py-8">
            <h1 className="font-heading text-3xl text-charcoal">Welcome to the Hero component</h1>
            <img 
            src={flower1} 
            alt="Red beautiful flower" 
            className="w-full max-w-3xl object-cover rounded-lg shadow-md"
            />
            <div className = "gap-4">
                <img src={flower2} alt="Flower" className="w-32 h-32 object-cover"
                </div>
        </section>
    )
}