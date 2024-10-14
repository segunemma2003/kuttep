import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Buy from "./pages/Buy.jsx"

import Homes from "./pages/Homes.jsx";
import HowToBuy from "./components/HowToBuy.jsx";





function App() {
  return (
    <>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Homes />} />
            <Route path="/buy" element= {<Buy />} />
            <Route path="/howtobuy" element= {<HowToBuy />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
