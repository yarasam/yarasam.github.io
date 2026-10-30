import { useRef } from "react";
import portfolioImg from "../assets/portfolio.png";
import star from "../assets/star.dot.png";
import "./Hero.css";
import { useLang } from "../Context/LanguageContext";
import content from "../Data/content";

export default function Hero() {
  const titleRef = useRef(null);
  const { lang } = useLang();
  const t = content[lang].hero;
//   for the image effect
  function handleMove(e) {
    const el = titleRef.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  }

  function handleLeave() {
    titleRef.current.style.transform = "";
  }

  return (
    <section className="hero">
      <p className="hero__eyebrow">{t.eyebrow}</p>
      <div className="hero__circle" />
      <div
        className="hero__title-wrap"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          ref={titleRef}
          className="hero__title"
          src={portfolioImg}
          alt="Portfolio"
        />
      </div>
      <img className="hero__star" src={star} alt="" />
    </section>
  );
}