import { useEffect, useState,useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact, SiNodedotjs, SiExpress, SiSqlite, SiFigma,
  SiGit, SiGithub, SiVite, SiJavascript, SiHtml5,
  SiPython, SiOverleaf, SiNotion,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { TbLayoutBoard, TbFileSpreadsheet, TbPalette, TbBrandCss3 } from 'react-icons/tb'
import './App.css'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">Yara</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
        // for dark and light modes 
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

//type effect
function TypeWriter({ words, typingSpeed = 80, deletingSpeed = 40, pause = 1600 }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) return
    const current = words[index % words.length]
    let timeout

    if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setSubIndex((s) => s + (deleting ? -1 : 1))
      }, deleting ? deletingSpeed : typingSpeed)
    }
    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index])

  const text = reducedMotion ? words[0] : words[index % words.length].substring(0, subIndex)

  return (
    <span className="typewriter">
      {text}
      <span className="type-cursor">|</span>
    </span>
  )
}

//boot 
function Hero() {
  return (
    <section id="top" className="hero">
      <p className="hero-eyebrow">Full-Stack Developer &amp; UX/UI Designer</p>
      <h1>
        I <span className="accent"><TypeWriter words={['build it.', 'design it.']} /></span>
      </h1>
      //to be edited
      <p className="sub">
        Computer Science graduate from Taif University, working across the
        full stack and the interface — from clinical software to early-stage
        product teams.
      </p>
      <div className="hero-cta">
        <a href="#projects" className="btn primary">View my work</a>
        <a href="#contact" className="btn">Get in touch</a>
      </div>
    </section>
  )
}

//main accoplishments
// text to be edited
function CountUp({ target, suffix = '', duration = 3.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    function step(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

//for image interactivity
function TiltCard({ className, children }) {
  const ref = useRef(null)

  function handleMove(e) {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = -((y - centerY) / centerY) * 10
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  function handleLeave() {
    ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

function About() {
  const stats = [
    { value: 7, prefix: 'Top ', label: 'HSIL Hackathon, nationwide — LUMINA' },
    { value: 370, prefix: '1 of ', label: 'projects selected, ~70 countries — GeoSense' },
    { value: 3, suffix: ' semesters', label: 'Graphic Design Lead, Cybersecurity Club' },
    { value: 1, suffix: ' year', label: 'Brand & Design Lead, Pre Hack' },
  ]

  return (
    <section id="about" className="bg-alt">
      <div className="wrap about-grid">
        <motion.div
          className="photo-cluster"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <TiltCard className="photo-rect">
            <img src="https://placehold.co/600x300/eee/999?text=Photo+1" alt="" />
          </TiltCard>
          <TiltCard className="photo-square">
            <img src="https://placehold.co/300x300/eee/999?text=Photo+2" alt="" />
          </TiltCard>
          <TiltCard className="photo-square">
            <img src="https://placehold.co/300x300/eee/999?text=Photo+3" alt="" />
          </TiltCard>
        </motion.div>

        <motion.div
          className="about-statement"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          //to be edited
          <p className="section-eyebrow">About</p>
          <h2>A hybrid path.</h2>
          <p className="lead">
            I'm a Computer Science graduate from Taif University, working across
            the full stack and the interface it lives in. My work spans a
            clinical decision-support system, an early-stage deep-tech product
            for the mining industry, and brand/design leadership at a Saudi
            startup — same core role each time: build it, and make sure it's
            genuinely usable. I'm currently open to IT, consulting, and
            project-management roles across Saudi companies and graduate
            development programs.
          </p>
        </motion.div>
      </div>

      <div className="wrap">
        <div className="stat-grid">
          {stats.map((s, i) => (
            <motion.div
              className="stat-card"
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="stat-num">
                {s.prefix}<CountUp target={s.value} suffix={s.suffix || ''} />
              </div>
              <p className="stat-label">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// text to be edited
//both experinces and projects
const WORK_ITEMS = [
  {
    id: 'prehack',
    dot: 'Pre Hack',
    kind: 'Role',
    year: 'Startup · Brand & Design Leadership',
    title: 'Pre Hack — Design & Brand Leadership',
    challenge:
      "Structure a growing startup's design and brand function from the ground up — governance, team roles, and a bootcamp curriculum — not just visual output.",
    services: ['Team Leadership', 'Governance Design', 'Brand Systems'],
    role:
      "Design & Brand Team Leader. Built the organization's governance framework across five departments, and co-ran a bootcamp in partnership with IBM SkillsBuild and eYouth.",
    result: '1 year · Brand & Design Team Leader',
  },
  {
    id: 'saca',
    dot: 'SACA',
    kind: 'Internship',
    year: 'Internship',
    title: 'Saudi Academy of Civil Aviation',
    challenge:
      'Contribute real web development work inside a national aviation training institution — production code, not a training exercise.',
    services: ['Web Development'],
    role: 'Web Development Intern.',
    result: null,
  },
  {
    id: 'citmedia',
    dot: 'CIT Media',
    kind: 'Role',
    year: 'Graphic Designer',
    title: 'CIT Media',
    challenge: 'Placeholder — add the real challenge/brief here.',
    services: ['Graphic Design'],
    role: 'Graphic Designer. Placeholder — add real details here.',
    result: null,
  },
  {
    id: 'lumina',
    dot: 'LUMINA',
    kind: 'Grad Project',
    year: 'Graduation Project',
    title: 'LUMINA — Clinical Decision Support System',
    challenge:
      'Design and build a clinician-facing interface for a breast cancer treatment-planning system — one that makes complex MRI-based analysis and treatment recommendations genuinely understandable to a clinician, not just accurate.',
    services: ['Front-End Development', 'UX/UI Design', 'Clinical UX'],
    role:
      'Front-end developer and UX/UI designer. Built the interface layer on top of a pipeline handling MRI segmentation, radiomic feature extraction, and treatment classification, with an explainability layer surfacing reasoning back to the user.',
    result: 'Top 7 · HSIL Hackathon, nationwide',
  },
  {
    id: 'geosense',
    dot: 'GeoSense',
    kind: 'Project',
    year: 'Deep-Tech Startup · Ongoing',
    title: 'GeoSense — Tunnel Collapse Prediction',
    challenge:
      'Build the product interface and public-facing site for an early-stage AI system predicting tunnel collapse risk in the mining industry — while representing a five-person founding team in incubator and accelerator applications.',
    services: ['Full-Stack Development', 'UX/UI Design', 'Product Site'],
    role:
      'Full-stack developer and UI/UX designer on the five-person founding team. Built the company profile site used across incubator and accelerator applications.',
    result: '1 of 370 · projects selected, ~70 countries',
  },
]

function WorkSidebar({ activeIndex, onSelect }) {
  return (
    <div className="work-sidebar">
      {WORK_ITEMS.map((item, i) => (
        <button
          key={item.id}
          className={`work-dot-row ${i === activeIndex ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          <span className="work-dot" />
          {i === activeIndex && <span className="work-dot-label">{item.dot}</span>}
        </button>
      ))}
    </div>
  )
}

function WorkAndExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const blockRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = blockRefs.current.indexOf(entry.target)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    blockRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollToIndex(i) {
    blockRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="work" className="work-section">
      <div className="wrap work-layout">
        <div className="work-sidebar-col">
          <WorkSidebar activeIndex={activeIndex} onSelect={scrollToIndex} />
        </div>

        <div className="work-content-col">
          {WORK_ITEMS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (blockRefs.current[i] = el)}
              className="work-block"
            >
              <div className="work-header-row">
              <p className="section-eyebrow">{item.year}</p>
              <span className={`kind-badge kind-${item.kind.toLowerCase().replace(' ', '-')}`}>
                {item.kind}
              </span>
              </div>
              <h2 className="work-title">{item.title}</h2>
              <div className="work-meta-grid">
                <div>
                  <p className="work-meta-label">Challenge</p>
                  <p className="work-meta-text">{item.challenge}</p>
                </div>
                <div>
                  <p className="work-meta-label">Services</p>
                  <div className="chip-row">
                    {item.services.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="work-meta-label">Role</p>
                  <p className="work-meta-text">{item.role}</p>
                  {item.result && <p className="work-result">{item.result}</p>}
                </div>
              </div>
              // to be edited for each project later
              <div className="work-media">
                <img src={`https://placehold.co/1200x600/111/eee?text=${encodeURIComponent(item.dot)}`} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TOOLS = [
  { Icon: SiReact, name: 'React' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiExpress, name: 'Express' },
  { Icon: SiSqlite, name: 'SQLite' },
  { Icon: SiVite, name: 'Vite' },
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: SiPython, name: 'Python' },
  { Icon: SiHtml5, name: 'HTML5' },
  { Icon: TbBrandCss3, name: 'CSS3' },
  { Icon: SiGit, name: 'Git' },
  { Icon: SiGithub, name: 'GitHub' },
  { Icon: VscVscode, name: 'VS Code' },
  { Icon: SiFigma, name: 'Figma' },
  { Icon: TbPalette, name: 'Canva' },
  { Icon: TbLayoutBoard, name: 'Mockups' },
  { Icon: TbFileSpreadsheet, name: 'Excel' },
  { Icon: SiOverleaf, name: 'Overleaf' },
  { Icon: SiNotion, name: 'Notion' },
]

function LogoMarquee() {
  const loop = [...TOOLS, ...TOOLS]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <div className="marquee-item" key={i} title={t.name}>
            <t.Icon size={32} />
          </div>
        ))}
      </div>
    </div>
  )
}

const SKILL_CATEGORIES = {
  Engineering: [
    { title: 'React & Modern JS', desc: 'Component architecture, hooks, state management.' },
    { title: 'Node.js / Express', desc: 'REST APIs, server logic, integration.' },
    { title: 'SQLite & Data', desc: 'Relational schema design, queries.' },
    { title: 'Security Fundamentals', desc: 'Applied cryptography, coursework in classical + modern ciphers.' },
  ],
  Design: [
    { title: 'UX/UI Design', desc: 'End-to-end product interface design.' },
    { title: 'Design Systems & Brand', desc: 'Visual identity, component libraries.' },
    { title: 'Bilingual Content', desc: 'Arabic and English copy and layout.' },
  ],
  Leadership: [
    { title: 'Team & Governance Structuring', desc: 'Org design across multi-department teams.' },
    { title: 'Presentation & Pitch Design', desc: 'Stakeholder-facing decks and narratives.' },
    { title: 'Stakeholder Documentation', desc: 'Clear written process and specs.' },
  ],
}

function OrbitCenter() {
  const ref = useRef(null)

  function handleMove(e) {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 18
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 18
    el.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`
  }
  function handleLeave() {
    ref.current.style.transform = 'perspective(400px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={ref}
      className="orbit-center"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span>You</span>
    </div>
  )
}

function SkillsOrbit() {
  const categories = Object.keys(SKILL_CATEGORIES)
  const [active, setActive] = useState(categories[0])
  const radius = 120

  return (
    <div className="orbit-wrap">
      <div className="orbit-stage">
        <OrbitCenter />
        {categories.map((cat, i) => {
          const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <div
              key={cat}
              className="orbit-node-pos"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <button
                className={`orbit-node ${active === cat ? 'active' : ''}`}
                style={{ animationDelay: `${i * 0.4}s` }}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            </div>
          )
        })}
      </div>

      <div className="orbit-cards">
        {SKILL_CATEGORIES[active].map((s) => (
          <motion.div
            className="skill-card"
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="bg-alt">
      <div className="wrap skills-header">
        <p className="section-eyebrow">Skills &amp; Tools</p>
        <h2>Powered by caffeine and these.</h2>
      </div>
      <LogoMarquee />
      <div className="wrap">
        <SkillsOrbit />
      </div>
    </section>
  )
}

//full components
export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <WorkAndExperience />
      <Skills/>
    </div>
  )
}