import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
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
import RegistrationModal from "./components/RegistrationModal"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GlobalLayout() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <Navbar />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout />
      <div className="app-content">
        <Routes>
          {/* Public route — login page */}
          <Route path="/" element={<Login />} />

          {/* Protected routes — redirect to "/" if no valid token */}
          <Route path="/home"       element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/cn"         element={<PrivateRoute><CN /></PrivateRoute>} />
          <Route path="/gfg"        element={<PrivateRoute><GFG /></PrivateRoute>} />
          <Route path="/ieee"       element={<PrivateRoute><IEEE /></PrivateRoute>} />
          <Route path="/vibin"      element={<PrivateRoute><Vibin /></PrivateRoute>} />
          <Route path="/iste"       element={<PrivateRoute><Iste /></PrivateRoute>} />
          <Route path="/bitsnbytes" element={<PrivateRoute><BitsNBytes /></PrivateRoute>} />
          <Route path="/about"      element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route path="/contact"    element={<PrivateRoute><Contactus /></PrivateRoute>} />
          <Route path="/sports"     element={<PrivateRoute><Sports /></PrivateRoute>} />
          <Route path="/cultural"   element={<PrivateRoute><Cultural /></PrivateRoute>} />
          <Route path="/hostel"     element={<PrivateRoute><Hostel /></PrivateRoute>} />
          <Route path="/technical"  element={<PrivateRoute><Technical /></PrivateRoute>} />
          <Route path="/profile"    element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
      <RegistrationModal />
      <Footer />
    </BrowserRouter>
  )
}

export default App