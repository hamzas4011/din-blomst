import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About.tsx";
import Sortiments from "./pages/Sortiments";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
          <Nav />
          <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/om-oss" element={<About />} />
          <Route path="/sortiment" element={<Sortiments />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    )
}

export default App;