import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Products";
import Handlekurv from "./pages/Cart";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [cart, setCart] = useState<{ name: string; price: string; image: string }[]>([]);

    const addToCart = (flower: { name: string; price: string; image: string }) => {
        setCart([...cart, flower]);
    };

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Nav cartCount={cart.length} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/om-oss" element={<About />} />
                    <Route path="/sortiment" element={<Product onAddToCart={addToCart} />} />
                    <Route path="/handlekurv" element={<Handlekurv cart={cart} />} />
                </Routes>
                <Footer className="mt-auto" />
            </div>
        </BrowserRouter>
    )
}

export default App;