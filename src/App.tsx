import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Products";
import Handlekurv from "./pages/Cart";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [cart, setCart] = useState<{ name: string; price: string; image: string; quantity: number }[]>([]);

    const addToCart = (flower: { name: string; price: string; image: string }, quantity: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.name === flower.name);
            if (existing) {
                return prev.map((item) =>
                    item.name === flower.name ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...flower, quantity }];
        });
    };

    const updateCartQuantity = (name: string, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) => (item.name === name ? { ...item, quantity: item.quantity + delta } : item))
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (name: string) => {
        setCart((prev) => prev.filter((item) => item.name !== name));
    };

    const confirmOrder = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Nav cartCount={cartCount} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/om-oss" element={<About />} />
                    <Route path="/sortiment" element={<Product onAddToCart={addToCart} />} />
                    <Route
                        path="/handlekurv"
                        element={
                            <Handlekurv
                                cart={cart}
                                onUpdateQuantity={updateCartQuantity}
                                onRemove={removeFromCart}
                                onConfirmOrder={confirmOrder}
                            />
                        }
                    />
                </Routes>
                <Footer className="mt-auto" />
            </div>
        </BrowserRouter>
    )
}

export default App;