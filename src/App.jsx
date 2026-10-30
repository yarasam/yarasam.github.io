import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Pages/Home";
import { LanguageProvider } from "./Context/LanguageContext";
//calls Home & navgation bar
export default function App() {
  return (
    <LanguageProvider>
        <HashRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </HashRouter>
    </LanguageProvider>//determains the language
  );
}