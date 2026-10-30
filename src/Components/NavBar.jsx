import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useLang } from "../Context/LanguageContext";
import content from "../Data/content";

export default function Navbar() {
    const { lang, toggleLang } = useLang();
    const t = content[lang].nav;
  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li><NavLink to="/">{t.home}</NavLink></li>
        <li><NavLink to="/">{t.expertise}</NavLink></li>
        <li><NavLink to="/">{t.projects}</NavLink></li>
        {/*ill add my services later */}
      </ul>
      <button className="navbar__lang" onClick={toggleLang}>
        {lang === "en" ? "AR" : "EN"}
      </button>
    </nav>
  );
}