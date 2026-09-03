import flowerImage from "../assets/flower-1.jpg";

export default function Hero() {
    return (
        <section className="h-screen">
            <h1>Welcome to the Hero component</h1>
            <img src={flowerImage} alt="Red beautiful flower" className="w-full h-3/6 object-scale-down"/>
        </section>
    )
}