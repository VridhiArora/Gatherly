import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Login from "./Login"
import Home from "./Home"
import CN from "./CN"
import GFG from "./GFG"
import IEEE from "./IEEE"
import Vibin from "./Vibin"
import Iste from "./Iste"
import BitsNBytes from "./BitsNBytes"
import AboutUs from "./AboutUs"
import Contactus from "./Contactus"
import Sports from "./Sports"
import Cultural from "./Cultural"
import Hostel from "./Hostel"
import Technical from "./Technical"
import Profile from "./Profile"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cn" element={<CN />} />
        <Route path="/gfg" element={<GFG />} />
        <Route path="/ieee" element={<IEEE />} />
        <Route path="/vibin" element={<Vibin />} />
        <Route path="/iste" element={<Iste />} />
        <Route path="/bitsnbytes" element={<BitsNBytes />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/hostel" element={<Hostel />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App