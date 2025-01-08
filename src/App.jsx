import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Sidebar from "./pages/sidebar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Portfolio from "./pages/portfolio";
// import DotRing from "./pages/DotRing";
import SecurityMessage from "./pages/securitypage";

function App() {
  return (
    <div className="cursor-none">
      {/* <DotRing /> */}
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/SecurityMessage" element={<SecurityMessage />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
