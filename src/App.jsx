import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Sidebar from "./pages/sidebar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Portfolio from "./pages/portfolio";
import DotRing from "./pages/DotRing";

function App() {
  return (
    <>
      <DotRing />

      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
