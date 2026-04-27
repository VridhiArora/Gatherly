import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import CN from "./pages/CN/CN"
import GFG from "./pages/GFG/GFG"
import IEEE from "./pages/IEEE/IEEE"
import Vibin from "./pages/Vibin/Vibin"
import Iste from "./pages/Iste/Iste"
import BitsNBytes from "./pages/BitsNBytes/BitsNBytes"
import AboutUs from "./pages/AboutUs/AboutUs"
import Contactus from "./pages/Contactus/Contactus"
import Sports from "./pages/Sports/Sports"
import Cultural from "./pages/Cultural/Cultural"
import Hostel from "./pages/Hostel/Hostel"
import Technical from "./pages/Technical/Technical"
import Profile from "./pages/Profile/Profile"
import Footer from "./components/Footer"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GlobalLayout() {
  return <Navbar />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout />
      <div className="app-content">
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
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App