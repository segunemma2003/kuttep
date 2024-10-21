import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";


import Homes from "./pages/Homes.jsx";
import HowToBuy from "./components/HowToBuy.jsx";
import Earn from "./pages/Earn.jsx";
import Buy from "./pages/Buy.Jsx";





function App() {
  return (
    <>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Homes />} />
            <Route path="/buy" element= {<Buy />} />
            <Route path="/howtobuy" element= {<HowToBuy />} />
            <Route path="/earn" element={<Earn />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
