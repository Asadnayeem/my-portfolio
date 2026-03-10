import { useState, useEffect, useRef } from "react";

const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #060b18; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #060b18; }
    ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 10px; }

    .font-syne { font-family: 'Syne', sans-serif; }
    .font-mono-custom { font-family: 'Space Mono', monospace; }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px #00d4ff33; }
      50% { box-shadow: 0 0 40px #00d4ff88, 0 0 80px #00d4ff22; }
    }
    @keyframes scan-line {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes rotateSlowly {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes networkPulse {
      0% { r: 3; opacity: 1; }
      100% { r: 10; opacity: 0; }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }

    .float-anim { animation: float 4s ease-in-out infinite; }
    .glow-box { animation: pulse-glow 3s ease-in-out infinite; }
    .blink { animation: blink 1s step-end infinite; }
    .fade-slide-up { animation: fadeSlideUp 0.7s ease forwards; }
    .slide-in-left { animation: slideInLeft 0.7s ease forwards; }

    .hero-bg {
      background: radial-gradient(ellipse at 20% 50%, #001a3322 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, #003d5522 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 80%, #001a2255 0%, transparent 60%),
                  #060b18;
    }

    .grid-bg {
      background-image: linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .text-cyan { color: #00d4ff; }
    .text-green-accent { color: #00ff88; }
    .border-cyan { border-color: #00d4ff44; }

    .nav-blur {
      backdrop-filter: blur(20px);
      background: rgba(6, 11, 24, 0.85);
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    }

    .skill-card {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 255, 136, 0.03) 100%);
      border: 1px solid rgba(0, 212, 255, 0.15);
      transition: all 0.3s ease;
    }
    .skill-card:hover {
      border-color: rgba(0, 212, 255, 0.6);
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(0, 255, 136, 0.06) 100%);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 212, 255, 0.15);
    }

    .project-card {
      background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,212,255,0.03) 100%);
      border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.3s ease;
    }
    .project-card:hover {
      border-color: rgba(0, 212, 255, 0.4);
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(0, 212, 255, 0.1);
    }

    .cta-btn {
      background: transparent;
      border: 1px solid #00d4ff;
      color: #00d4ff;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .cta-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent);
      transition: left 0.4s ease;
    }
    .cta-btn:hover::before { left: 100%; }
    .cta-btn:hover {
      background: rgba(0, 212, 255, 0.1);
      box-shadow: 0 0 25px rgba(0, 212, 255, 0.3), inset 0 0 25px rgba(0, 212, 255, 0.05);
    }

    .cta-btn-filled {
      background: linear-gradient(135deg, #00d4ff, #0095cc);
      color: #060b18;
      font-weight: 700;
      transition: all 0.3s ease;
    }
    .cta-btn-filled:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: -33px;
      top: 6px;
      width: 12px; height: 12px;
      background: #00d4ff;
      border-radius: 50%;
      box-shadow: 0 0 10px #00d4ff;
    }

    .section-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .tag {
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.25);
      color: #00d4ff;
      font-family: 'Space Mono', monospace;
      font-size: 11px;
    }

    .contact-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,212,255,0.04));
      border: 1px solid rgba(0,212,255,0.2);
      transition: all 0.3s ease;
    }
    .contact-card:hover {
      border-color: rgba(0,212,255,0.5);
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,212,255,0.1);
    }

    .nav-link {
      position: relative;
      color: rgba(226, 232, 240, 0.6);
      transition: color 0.3s ease;
      font-family: 'Space Mono', monospace;
      font-size: 13px;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 1px;
      background: #00d4ff;
      transition: width 0.3s ease;
    }
    .nav-link:hover { color: #00d4ff; }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .nav-link.active { color: #00d4ff; }

    .mobile-menu {
      background: rgba(6, 11, 24, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0,212,255,0.1);
    }
  `}</style>
);

const NetworkBg = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
    <defs>
      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
      </radialGradient>
    </defs>
    {[
      [120, 200], [300, 100], [500, 280], [700, 150], [850, 320],
      [200, 400], [450, 480], [650, 380], [900, 200], [100, 500],
      [750, 500], [350, 300], [580, 100], [980, 400]
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="#00d4ff" opacity="0.6" />
        <circle cx={x} cy={y} r="8" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
      </g>
    ))}
    {[
      [120,200,300,100],[300,100,500,280],[500,280,700,150],
      [700,150,850,320],[200,400,450,480],[450,480,650,380],
      [300,100,200,400],[500,280,450,480],[700,150,650,380],
      [850,320,900,200],[100,500,200,400],[650,380,750,500],
      [350,300,580,100],[580,100,700,150],[350,300,500,280]
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
    ))}
  </svg>
);

const skills = [
  { name: "Networking", icon: "🌐", level: 90 },
  { name: "IP Subnetting", icon: "📡", level: 88 },
  { name: "Routing", icon: "🔀", level: 85 },
  { name: "OLT Configuration", icon: "⚙️", level: 50 },
  { name: "MikroTik", icon: "🛡️", level: 60 },
  { name: "Linux", icon: "🐧", level: 10 },
  { name: "Docker", icon: "🐳", level: 10 },
  { name: "Network Monitoring", icon: "📊", level: 89 },
];

const projects = [
  {
    title: "ISP Network Monitoring System",
    description: "Implemented real-time network monitoring solutions for ISP infrastructure, tracking uptime, bandwidth utilization, and alerting on critical thresholds across multiple nodes.",
    tags: ["Network Monitoring", "SNMP", "Bandwidth Analysis"],
    icon: "📊",
    color: "#00d4ff",
  },
  {
    title: "OLT & ONU Configuration",
    description: "Configured and managed GPON/EPON Optical Line Terminals and Optical Network Units for last-mile fiber connectivity, provisioning hundreds of subscribers.",
    tags: ["GPON", "EPON", "OLT", "Fiber Optics"],
    icon: "💡",
    color: "#00ff88",
  },
  {
    title: "ISP Client Connectivity Troubleshooting",
    description: "Led systematic diagnosis and resolution of complex ISP client connectivity issues including PPPoE, RADIUS authentication failures, and routing anomalies.",
    tags: ["PPPoE", "RADIUS", "Troubleshooting", "ISP"],
    icon: "🔧",
    color: "#ff6b6b",
  },
  {
    title: "Network Automation Scripts",
    description: "Developed basic Bash and Python scripts to automate repetitive network tasks — configuration backups, log parsing, and uptime checks — reducing manual effort.",
    tags: ["Python", "Bash", "Automation", "Linux"],
    icon: "🤖",
    color: "#a78bfa",
  },
];

const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const TypeWriter = ({ texts, speed = 80 }) => {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? 40 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span>
      <span className="text-cyan">{displayed}</span>
      <span className="blink text-cyan">|</span>
    </span>
  );
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useIntersectionObserver();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = ["home", "about", "skills", "experience", "projects", "contact"];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#060b18", minHeight: "100vh" }}>
      <GoogleFonts />

      {/* NAVBAR */}
      <nav
        className={`nav-blur fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{ padding: scrolled ? "12px 0" : "18px 0" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="font-syne" style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            <span style={{ color: "#00d4ff" }}>&lt;</span>
            <span style={{ color: "#e2e8f0" }}>Portfolio</span>
            <span style={{ color: "#00d4ff" }}>/&gt;</span>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`nav-link ${activeSection === link ? "active" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer", textTransform: "capitalize" }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "6px", padding: "8px", cursor: "pointer", display: "none" }}
            className="hamburger"
          >
            <div style={{ width: "20px", height: "2px", background: "#00d4ff", marginBottom: "4px", transition: "all 0.3s" }} />
            <div style={{ width: "20px", height: "2px", background: "#00d4ff", marginBottom: "4px" }} />
            <div style={{ width: "20px", height: "2px", background: "#00d4ff" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{ padding: "16px 24px" }}>
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  display: "block", width: "100%", padding: "12px 0",
                  background: "none", border: "none", textAlign: "left",
                  color: activeSection === link ? "#00d4ff" : "rgba(226,232,240,0.6)",
                  fontFamily: "'Space Mono', monospace", fontSize: "13px",
                  textTransform: "capitalize", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-btns { justify-content: center !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
          .section-pad { padding: 80px 20px !important; }
          .hero-section { padding: 120px 20px 80px !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        id="home"
        className="hero-bg grid-bg hero-section"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}
      >
        <NetworkBg />
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "60px", alignItems: "center" }}>
            <div>
              <div
                className="font-mono-custom fade-slide-up"
                style={{ color: "#00ff88", fontSize: "13px", marginBottom: "16px", letterSpacing: "2px" }}
              >
                &gt; HELLO, I'M
              </div>
              <h1
                className="font-syne fade-slide-up"
                style={{
                  fontSize: "clamp(42px, 6vw, 76px)", fontWeight: "800",
                  lineHeight: "1.05", letterSpacing: "-2px",
                  color: "#e2e8f0", marginBottom: "16px",
                  animationDelay: "0.1s"
                }}
              >
                Ali Mohammad<br />
                <span style={{ color: "#00d4ff" }}>Asad</span>
              </h1>
              <div
                className="font-syne fade-slide-up"
                style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "rgba(226,232,240,0.6)", marginBottom: "24px", animationDelay: "0.2s" }}
              >
                <TypeWriter texts={["Assistant Engineer", "Networking Specialist", "Telecom Professional", "Linux Enthusiast"]} />
              </div>
              <p
                className="fade-slide-up"
                style={{
                  fontSize: "16px", lineHeight: "1.8",
                  color: "rgba(226,232,240,0.55)", maxWidth: "520px",
                  marginBottom: "40px", animationDelay: "0.3s"
                }}
              >
                BSc in Electronic and Telecommunication Engineering. Passionate about
                ISP infrastructure, fiber optic networks, and bridging the gap between
                traditional networking and modern DevOps practices.
              </p>
              <div className="hero-btns fade-slide-up" style={{ display: "flex", gap: "16px", flexWrap: "wrap", animationDelay: "0.4s" }}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="cta-btn-filled"
                  style={{ padding: "14px 32px", borderRadius: "6px", border: "none", fontSize: "14px", cursor: "pointer", fontFamily: "'Space Mono', monospace" }}
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="cta-btn"
                  style={{ padding: "14px 32px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", fontFamily: "'Space Mono', monospace" }}
                >
                  Contact Me
                </button>
              </div>

              <div className="fade-slide-up" style={{ display: "flex", gap: "24px", marginTop: "48px", animationDelay: "0.5s" }}>
                {[
                  { label: "Years Exp.", value: "2+" },
                  { label: "Projects Done", value: "15+" },
                  { label: "Clients Served", value: "500+" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "left" }}>
                    <div className="font-syne" style={{ fontSize: "28px", fontWeight: "800", color: "#00d4ff" }}>{stat.value}</div>
                    <div style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)", fontFamily: "'Space Mono', monospace" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hero-visual float-anim" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                className="glow-box"
                style={{
                  width: "340px", height: "340px", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.03) 60%, transparent 100%)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative"
                }}
              >
                {/* Orbit rings */}
                <div style={{
                  position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
                  border: "1px dashed rgba(0,212,255,0.15)",
                  animation: "rotateSlowly 20s linear infinite"
                }}>
                  <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%)", width: "10px", height: "10px", background: "#00ff88", borderRadius: "50%", boxShadow: "0 0 10px #00ff88" }} />
                </div>
                <div style={{
                  position: "absolute", width: "75%", height: "75%", borderRadius: "50%",
                  border: "1px dashed rgba(0,255,136,0.1)",
                  animation: "rotateSlowly 14s linear infinite reverse"
                }}>
                  <div style={{ position: "absolute", bottom: "-5px", right: "0%", width: "8px", height: "8px", background: "#00d4ff", borderRadius: "50%", boxShadow: "0 0 8px #00d4ff" }} />
                </div>
                {/* Center Icon */}
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: "72px", marginBottom: "8px" }}>🌐</div>
                  <div className="font-mono-custom" style={{ fontSize: "11px", color: "#00d4ff", letterSpacing: "2px" }}>NETWORK ENG</div>
                </div>
                {/* Status dots */}
                {[
                  { label: "GPON", top: "10%", right: "-10%", color: "#00ff88" },
                  { label: "MikroTik", bottom: "15%", left: "-12%", color: "#00d4ff" },
                  { label: "Linux", top: "40%", right: "-15%", color: "#a78bfa" },
                ].map((dot) => (
                  <div
                    key={dot.label}
                    style={{
                      position: "absolute", ...{ top: dot.top, bottom: dot.bottom, left: dot.left, right: dot.right },
                      background: "rgba(6,11,24,0.9)",
                      border: `1px solid ${dot.color}55`,
                      borderRadius: "20px", padding: "6px 12px",
                      fontSize: "11px", color: dot.color,
                      fontFamily: "'Space Mono', monospace",
                      display: "flex", alignItems: "center", gap: "6px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div style={{ width: "6px", height: "6px", background: dot.color, borderRadius: "50%", boxShadow: `0 0 6px ${dot.color}` }} />
                    {dot.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "rgba(226,232,240,0.3)", fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "2px" }}>SCROLL</div>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #00d4ff, transparent)", margin: "0 auto", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-pad" style={{ padding: "100px 24px", background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-reveal">
            <div className="font-mono-custom" style={{ color: "#00ff88", fontSize: "12px", letterSpacing: "3px", marginBottom: "12px" }}>// 01. ABOUT</div>
            <h2 className="font-syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", marginBottom: "60px", color: "#e2e8f0" }}>
              About <span style={{ color: "#00d4ff" }}>Me</span>
            </h2>
          </div>

          <div className="about-grid section-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "16px", lineHeight: "1.9", color: "rgba(226,232,240,0.65)", marginBottom: "24px" }}>
                I'm <strong style={{ color: "#e2e8f0" }}>Ali Mohammad Asad</strong>, an Assistant Engineer at Stardust Telecom Ltd with a strong foundation in networking and telecommunications. My journey began with a BSc in Electronic and Telecommunication Engineering, where I developed a deep understanding of how modern networks are built and maintained.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "1.9", color: "rgba(226,232,240,0.65)", marginBottom: "24px" }}>
                I specialize in <span style={{ color: "#00d4ff" }}>ISP infrastructure management</span>, particularly fiber optic technologies like GPON and EPON, OLT/ONU configuration, and end-to-end client connectivity management. My day-to-day involves network monitoring, systematic troubleshooting of complex issues, and RADIUS authentication systems.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "1.9", color: "rgba(226,232,240,0.65)" }}>
                Beyond my core role, I'm actively expanding into <span style={{ color: "#00ff88" }}>Linux and DevOps</span> — exploring automation, scripting, and cloud-native networking to stay ahead in an ever-evolving tech landscape.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Name", value: "Ali Mohammad Asad" },
                { label: "Title", value: "Assistant Engineer" },
                { label: "Company", value: "Stardust Telecom Ltd" },
                { label: "Education", value: "BSc in ETE Engineering" },
                { label: "Focus", value: "Networking & Telecom" },
                { label: "Currently Learning", value: "Linux & DevOps" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex", gap: "16px", alignItems: "baseline",
                    padding: "12px 20px",
                    background: "rgba(0,212,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.1)",
                    borderRadius: "8px"
                  }}
                >
                  <span className="font-mono-custom" style={{ fontSize: "11px", color: "#00d4ff", minWidth: "130px", letterSpacing: "1px" }}>{item.label}</span>
                  <span style={{ color: "rgba(226,232,240,0.8)", fontSize: "14px" }}>→ {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section-pad" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-reveal">
            <div className="font-mono-custom" style={{ color: "#00ff88", fontSize: "12px", letterSpacing: "3px", marginBottom: "12px" }}>// 02. SKILLS</div>
            <h2 className="font-syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", marginBottom: "12px", color: "#e2e8f0" }}>
              Technical <span style={{ color: "#00d4ff" }}>Skills</span>
            </h2>
            <p style={{ color: "rgba(226,232,240,0.4)", marginBottom: "60px", fontSize: "15px" }}>
              Core competencies in networking infrastructure and telecom systems
            </p>
          </div>

          <div className="skills-grid section-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-card"
                style={{
                  borderRadius: "12px", padding: "24px 16px",
                  textAlign: "center",
                  animationDelay: `${i * 0.06}s`
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{skill.icon}</div>
                <div className="font-syne" style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0", marginBottom: "12px" }}>{skill.name}</div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", height: "3px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%", borderRadius: "4px",
                      background: `linear-gradient(90deg, #00d4ff, #00ff88)`,
                      width: `${skill.level}%`,
                      transition: "width 1.5s ease"
                    }}
                  />
                </div>
                <div className="font-mono-custom" style={{ fontSize: "10px", color: "#00d4ff", marginTop: "6px" }}>{skill.level}%</div>
              </div>
            ))}
          </div>

          {/* Extra skills badges */}
          <div className="section-reveal" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {["TCP/IP", "DNS/DHCP", "VLANs", "BGP", "OSPF", "Wireshark", "PPPoE", "Bash Scripting", "Python Basics", "Git"].map((s) => (
              <span key={s} className="tag" style={{ padding: "6px 14px", borderRadius: "20px" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="section-pad" style={{ padding: "100px 24px", background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-reveal">
            <div className="font-mono-custom" style={{ color: "#00ff88", fontSize: "12px", letterSpacing: "3px", marginBottom: "12px" }}>// 03. EXPERIENCE</div>
            <h2 className="font-syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", marginBottom: "60px", color: "#e2e8f0" }}>
              Work <span style={{ color: "#00d4ff" }}>Experience</span>
            </h2>
          </div>

          <div className="section-reveal" style={{ paddingLeft: "40px", borderLeft: "1px solid rgba(0,212,255,0.2)", position: "relative" }}>
            {[
              {
                role: "Assistant Engineer",
                company: "Stardust Telecom Ltd",
                period: "2025 – Present",
                type: "Full-time",
                color: "#00d4ff",
                responsibilities: [
                  "Monitor and maintain ISP network infrastructure across multiple zones, ensuring 99%+ uptime",
                  "Configure and manage GPON/EPON OLTs and ONUs for fiber-to-the-home deployments",
                  "Troubleshoot and resolve complex client connectivity issues including PPPoE, RADIUS, and routing problems",
                  "Manage IP address allocation, subnetting, and VLAN configurations for enterprise and residential clients",
                  "Respond to NOC alerts and coordinate with field teams to resolve network faults efficiently",
                ],
              },
              {
                role: "Teaching Assistant",
                company: "Computer Fundamentals & Programming Language Course",
                period: "2022 – 2023",
                type: "Part-time",
                color: "#00ff88",
                responsibilities: [
                  "Assisted students in understanding core computer science concepts and programming fundamentals",
                  "Guided lab sessions on introductory programming with hands-on coding exercises",
                  "Prepared study materials, quizzes, and assignments to reinforce theoretical learning",
                  "Provided one-on-one support to struggling students, improving overall class performance",
                ],
              },
            ].map((exp, i) => (
              <div
                key={i}
                className="timeline-item"
                style={{
                  position: "relative", marginBottom: "50px",
                  padding: "28px 32px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,212,255,0.02) 100%)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  borderRadius: "12px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <div>
                    <h3 className="font-syne" style={{ fontSize: "20px", fontWeight: "700", color: "#e2e8f0", marginBottom: "4px" }}>{exp.role}</h3>
                    <div style={{ color: exp.color, fontSize: "14px", fontFamily: "'Space Mono', monospace" }}>{exp.company}</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexDirection: "column", alignItems: "flex-end" }}>
                    <span className="tag" style={{ padding: "4px 12px", borderRadius: "4px" }}>{exp.period}</span>
                    <span style={{
                      fontSize: "11px", padding: "3px 10px", borderRadius: "4px",
                      background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}33`,
                      fontFamily: "'Space Mono', monospace"
                    }}>{exp.type}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "rgba(226,232,240,0.6)", fontSize: "14px", lineHeight: "1.7" }}>
                      <span style={{ color: exp.color, marginTop: "6px", flexShrink: 0 }}>▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Education entry */}
            <div
              className="timeline-item"
              style={{
                position: "relative",
                padding: "28px 32px",
                background: "linear-gradient(135deg, rgba(167,139,250,0.04) 0%, rgba(167,139,250,0.02) 100%)",
                border: "1px solid rgba(167,139,250,0.15)",
                borderRadius: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h3 className="font-syne" style={{ fontSize: "20px", fontWeight: "700", color: "#e2e8f0", marginBottom: "4px" }}>
                    BSc in Electronic & Telecommunication Engineering
                  </h3>
                  <div style={{ color: "#a78bfa", fontSize: "14px", fontFamily: "'Space Mono', monospace" }}>University — ETE Department</div>
                </div>
                <span className="tag" style={{ padding: "4px 12px", borderRadius: "4px", borderColor: "rgba(167,139,250,0.3)", color: "#a78bfa" }}>Education</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section-pad" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-reveal">
            <div className="font-mono-custom" style={{ color: "#00ff88", fontSize: "12px", letterSpacing: "3px", marginBottom: "12px" }}>// 04. PROJECTS</div>
            <h2 className="font-syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", marginBottom: "12px", color: "#e2e8f0" }}>
              Featured <span style={{ color: "#00d4ff" }}>Projects</span>
            </h2>
            <p style={{ color: "rgba(226,232,240,0.4)", marginBottom: "60px", fontSize: "15px" }}>
              A selection of network engineering and telecom work
            </p>
          </div>

          <div className="projects-grid section-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {projects.map((proj, i) => (
              <div
                key={i}
                className="project-card"
                style={{ borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden" }}
              >
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "120px", height: "120px",
                  background: `radial-gradient(circle, ${proj.color}15 0%, transparent 70%)`,
                  borderRadius: "0 16px 0 0"
                }} />
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{proj.icon}</div>
                <h3 className="font-syne" style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "12px" }}>{proj.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(226,232,240,0.55)", marginBottom: "20px" }}>{proj.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px", padding: "4px 10px", borderRadius: "4px",
                        background: `${proj.color}12`, color: proj.color,
                        border: `1px solid ${proj.color}25`,
                        fontFamily: "'Space Mono', monospace"
                      }}
                    >{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="section-pad"
        style={{
          padding: "100px 24px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 60%), rgba(0,212,255,0.02)",
          borderTop: "1px solid rgba(0,212,255,0.06)"
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-reveal">
            <div className="font-mono-custom" style={{ color: "#00ff88", fontSize: "12px", letterSpacing: "3px", marginBottom: "12px" }}>// 05. CONTACT</div>
            <h2 className="font-syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", marginBottom: "16px", color: "#e2e8f0" }}>
              Get In <span style={{ color: "#00d4ff" }}>Touch</span>
            </h2>
            <p style={{ color: "rgba(226,232,240,0.5)", fontSize: "16px", lineHeight: "1.8", maxWidth: "500px", margin: "0 auto 60px" }}>
              Open to new opportunities, collaborations, or just a conversation about networking and telecom. Let's connect!
            </p>
          </div>

          <div className="contact-grid section-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {[
              {
                label: "Email",
                value: "asadnayeem0@gmail.com",
                icon: "✉️",
                href: "mailto:asadnayeem0@gmail.com",
                color: "#00d4ff"
              },
              {
                label: "Phone",
                value: "+880 17 995 66515",
                icon: "📞",
                href: "tel:+880",
                color: "#00ff88"
              },
              {
                label: "LinkedIn",
                value: "https://www.linkedin.com/in/ali-mohammad-asad-3893bb195/",
                icon: "💼",
                href: "https://linkedin.com",
                color: "#a78bfa"
              },
            ].map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="contact-card"
                style={{
                  borderRadius: "12px", padding: "28px 20px",
                  textDecoration: "none", display: "block"
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{contact.icon}</div>
                <div className="font-mono-custom" style={{ fontSize: "11px", color: contact.color, letterSpacing: "2px", marginBottom: "6px" }}>
                  {contact.label}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(226,232,240,0.55)", wordBreak: "break-all" }}>{contact.value}</div>
              </a>
            ))}
          </div>

          <div className="section-reveal">
            <button
              onClick={() => scrollTo("home")}
              className="cta-btn"
              style={{ padding: "14px 36px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "'Space Mono', monospace" }}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(0,212,255,0.08)",
        padding: "24px",
        textAlign: "center",
        background: "#040810"
      }}>
        <div className="font-mono-custom" style={{ fontSize: "12px", color: "rgba(226,232,240,0.2)" }}>
          © 2024 <span style={{ color: "#00d4ff" }}>Ali Mohammad Asad</span> · Built with React · All rights reserved
        </div>
      </footer>
    </div>
  );
}