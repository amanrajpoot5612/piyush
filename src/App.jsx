import { useEffect, useState } from "react";
import "./App.css";
import ServiceCarousel from "./components/ServiceCarousel";
import WhyChooseUsSection from "./components/WhyChooseUsSection";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  {
    label: "Blogs",
    href: "https://www.rapiddigitalgrowth.com/blogs",
    external: true,
  },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const businessCategories = [
  "Hospital & Healthcare",
  "Hotels & Restaurant",
  "Education",
  "Law",
  "B2B",
  "Real Estate",
  "E-Commerce",
];

const serviceItems = [
  {
    title: "Website Design & Development",
    description:
      "Responsive websites built for performance, conversion, and brand clarity.",
    features: [
      "Mobile-first layouts",
      "SEO-friendly structure",
      "Fast loading performance",
      "Clean visual storytelling",
    ],
    image: "/images/services/service-1.jpg",
  },
  {
    title: "SEO Optimization",
    description:
      "Search engine campaigns that improve rankings, visibility and trust.",
    features: [
      "Technical audits",
      "Keyword research",
      "On-page and off-page strategies",
      "Sustainable organic growth",
    ],
    image: "/images/services/service-2.jpg",
  },
  {
    title: "Social Media Marketing",
    description:
      "Creative social campaigns that engage audiences and build authority.",
    features: [
      "Platform strategy",
      "Content planning",
      "Community management",
      "Paid and organic growth",
    ],
    image: "/images/services/service-3.jpg",
  },
  {
    title: "Paid Ads Promotion",
    description:
      "Precision ad campaigns designed to maximize ROI and lead quality.",
    features: [
      "Google Ads and Meta ads",
      "Audience segmentation",
      "Creative testing",
      "Performance optimization",
    ],
    image: "/images/services/service-4.jpg",
  },
];

const packageCards = [
  {
    title: "Website Packages",
    subtitle: "Smart websites for fast-growing brands.",
    icon: "🖥️",
    items: [
      "Custom design & development",
      "CMS integration",
      "Fast loading pages",
      "SEO-ready structure",
    ],
  },
  {
    title: "SEO Packages",
    subtitle: "Search growth packages for local and national brands.",
    icon: "📈",
    items: [
      "Keyword research",
      "Technical SEO audit",
      "Link building support",
      "Content optimization",
    ],
  },
  {
    title: "Growth Packages",
    subtitle: "Integrated campaigns that turn clicks into revenue.",
    icon: "🚀",
    items: [
      "Social media planning",
      "Paid ads management",
      "Conversion funnels",
      "Monthly reporting",
    ],
  },
];

const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "70%", label: "Average ROI" },
  { value: "8+", label: "Years Experience" },
  { value: "4x", label: "Avg Traffic Growth" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [videoAutoplay, setVideoAutoplay] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setLoaded(true);

    const setVideoPreference = () => {
      setVideoAutoplay(window.innerWidth >= 900);
    };
    setVideoPreference();
    window.addEventListener("resize", setVideoPreference);

    const reveal = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add("revealed");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });

    return () => {
      window.removeEventListener("resize", setVideoPreference);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return (
    <div className={`page-shell${loaded ? " loaded" : ""}`}>

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home">
            <span className="brand-mark">DBG</span>
            <strong className="brand-name">Digital Brands Growth</strong>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setBusinessOpen(true); setMenuOpen(false); }}
            >
              Industries
            </button>
            <a className="btn btn-primary" href="#contact">Let's Talk</a>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-top">
          <a className="brand" href="#home">
            <span className="brand-mark">DBG</span>
          </a>
          <button
            type="button"
            className="icon-button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >×</button>
        </div>
        <nav className="mobile-links">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setBusinessOpen(true); setMenuOpen(false); }}
          >
            Industries We Serve
          </button>
          <a className="btn btn-primary mobile-cta" href="#contact">
            Get Free Consultation
          </a>
        </div>
      </div>

      {/* ── BUSINESS PANEL ── */}
      <aside className={`business-panel ${businessOpen ? "open" : ""}`}>
        <div className="business-panel-inner">
          <div className="business-panel-head">
            <div>
              <p className="eyebrow">Industries</p>
              <h3>We Serve Every Sector</h3>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Close panel"
              onClick={() => setBusinessOpen(false)}
            >×</button>
          </div>
          <ul className="business-list">
            {businessCategories.map((cat) => (
              <li key={cat}>
                <span className="biz-dot" />
                {cat}
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href="#contact" onClick={() => setBusinessOpen(false)}>
            Start a Project
          </a>
        </div>
      </aside>

      <main>

        {/* ══════════════════════════════════════════
            HERO — Video on the RIGHT, copy on LEFT
            The old right-side "About Us" dialog box
            is replaced by the video. The panel content
            is now the inline #about-inline block below.
        ══════════════════════════════════════════ */}
        <section id="home" className="hero-section section">
          <div className="hero-bg-grid" aria-hidden="true" />

          <div className="container hero-grid">

            {/* LEFT: copy */}
            <div className="hero-copy reveal-on-scroll">
              <p className="eyebrow hero-eyebrow">
                Premium Digital Marketing Agency · India
              </p>
              <h1 className="hero-headline">
                We build brands that generate{" "}
                <span className="headline-accent">traffic, leads</span>{" "}
                and revenue.
              </h1>
              <p className="hero-description">
                From SEO and social media to paid campaigns and website design,
                DBG helps ambitious brands grow with premium digital strategy.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="#contact">
                  Get Free Consultation
                </a>
                <a className="btn btn-ghost btn-lg" href="#services">
                  View Services ↓
                </a>
              </div>

              {/* Stats row — replaces old badges */}
              <div className="hero-stats">
                {stats.map((s) => (
                  <div key={s.label} className="hero-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Hero Video (replaces old dialog box) */}
            <div className="hero-video-pane reveal-on-scroll">
              <div className="hero-video-wrap">
                <video
                  className="hero-player"
                  playsInline
                  preload="metadata"
                  poster="/images/video-poster.jpg"
                  controls={!videoAutoplay}
                  {...(videoAutoplay
                    ? { autoPlay: true, muted: true, loop: true }
                    : {})}
                >
                  <source src="/videos/hero-demo.mp4" type="video/mp4" />
                  Your browser does not support video.
                </video>
                {/* Floating badge overlay */}
                <div className="video-badge video-badge--tl">
                  <span className="vb-dot" />
                  Live Results
                </div>
                <div className="video-badge video-badge--br">
                  🏆 Award Winning Agency
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABOUT-INLINE — replaces the old hero panel.
            Shows the "WELCOME TO DBG" content directly
            on the homepage as a distinct section.
            (Previously hidden in the right-side dialog.)
        ══════════════════════════════════════════ */}
        <section id="about-inline" className="about-inline-section section reveal-on-scroll">
          <div className="container about-inline-grid">
            <div className="about-inline-label">
              <p className="eyebrow">Who We Are</p>
              <div className="about-inline-line" />
            </div>
            <div className="about-inline-copy">
              <h2>Welcome to DBG</h2>
              <p>
                Shaping digital journeys with a passionate digital marketing
                agency in India. We blend creativity, technology and performance
                to help brands stand out and grow online.
              </p>
              <ul className="about-inline-list">
                <li>Custom campaigns for startup and enterprise growth.</li>
                <li>Brand-first storytelling with measurable marketing.</li>
                <li>Full-service digital solutions from strategy to execution.</li>
              </ul>
            </div>
            <div className="about-inline-cards">
              <div className="about-chip">
                <span className="chip-icon">🎯</span>
                <div>
                  <strong>Precision Strategy</strong>
                  <p>Data-informed decisions at every step.</p>
                </div>
              </div>
              <div className="about-chip">
                <span className="chip-icon">💡</span>
                <div>
                  <strong>Creative Execution</strong>
                  <p>Content that converts and campaigns that scale.</p>
                </div>
              </div>
              <div className="about-chip">
                <span className="chip-icon">📊</span>
                <div>
                  <strong>Transparent Reporting</strong>
                  <p>Real numbers, real outcomes, no fluff.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <WhyChooseUsSection />

        {/* ── ABOUT (full) ── */}
        <section id="about" className="about-section section reveal-on-scroll">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="eyebrow">About DBG</p>
              <h2>Shaping digital journeys with strategic marketing.</h2>
              <p>
                DBG is a premium digital marketing agency focused on helping
                businesses in India and beyond build authority, capture demand,
                and scale sustainably.
              </p>
              <p>
                We deliver polished websites, powerful SEO, engaging social
                campaigns and ROI-focused ad programs—all with clarity,
                communication, and digital-first intelligence.
              </p>
              <a className="btn btn-primary" href="#contact">
                Start Your Project
              </a>
            </div>
            <div className="about-card">
              <div className="about-card-top">
                <span className="eyebrow">Why choose DBG</span>
                <h3>Growth that feels premium, not overpriced.</h3>
              </div>
              <ul className="about-features">
                <li>Data-informed strategy with creative execution.</li>
                <li>Transparent reporting and outcomes you can measure.</li>
                <li>Flexible packages for startups and enterprise brands.</li>
                <li>Dedicated support for every campaign phase.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="services-section section reveal-on-scroll">
          <div className="container section-header">
            <p className="eyebrow">What We Do</p>
            <h2>Boost Your Brand with Expert Digital Marketing Services</h2>
            <p>Full-service marketing designed for growth, visibility and business results.</p>
          </div>
          <div className="container">
            {serviceItems.some((s) => s.image) ? (
              <ServiceCarousel items={serviceItems} />
            ) : (
              <div className="services-grid">
                {serviceItems.map((service) => (
                  <article key={service.title} className="service-card">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>
                      {service.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <a className="service-link" href="#contact">Read More →</a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section id="packages" className="packages-section section reveal-on-scroll">
          <div className="container section-header">
            <p className="eyebrow">Packages</p>
            <h2>Choose a package for your next growth stage</h2>
            <p>Simple, smart packages that make it easy to start marketing with confidence.</p>
          </div>
          <div className="container packages-grid">
            {packageCards.map((pkg, i) => (
              <div key={pkg.title} className={`package-card${i === 1 ? " package-card--featured" : ""}`}>
                <div className="pkg-icon">{pkg.icon}</div>
                {i === 1 && <span className="pkg-badge">Most Popular</span>}
                <h3>{pkg.title}</h3>
                <p className="pkg-subtitle">{pkg.subtitle}</p>
                <ul>
                  {pkg.items.map((item) => (
                    <li key={item}>
                      <span className="check">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <a className={`btn ${i === 1 ? "btn-primary" : "btn-ghost"}`} href="#contact">
                  Explore Package
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="contact-section section reveal-on-scroll">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Let's Build Together</p>
              <h2>Ready to launch your next digital campaign?</h2>
              <p>
                Contact DBG for a free consultation, campaign strategy or brand growth plan.
              </p>
              <div className="contact-details">
                <a href="tel:+918368123312" className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <span>+91 83681 23312</span>
                  </div>
                </a>
                <a href="mailto:info@digitalbrandsgrowth.com" className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <span>info@digitalbrandsgrowth.com</span>
                  </div>
                </a>
                <a href="https://www.digitalbrandsgrowth.com" target="_blank" rel="noreferrer" className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <div>
                    <strong>Website</strong>
                    <span>digitalbrandsgrowth.com</span>
                  </div>
                </a>
              </div>
            </div>

            <form className="contact-form">
              <label>
                Name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@company.com" />
              </label>
              <label>
                Phone
                <input type="tel" placeholder="+91 9XXXXXXXXX" />
              </label>
              <label>
                Service Interested In
                <select>
                  <option>SEO</option>
                  <option>SMO</option>
                  <option>SMM</option>
                  <option>Google Ads</option>
                  <option>Website Design</option>
                </select>
              </label>
              <label>
                Message
                <textarea rows="4" placeholder="Tell us about your goals" />
              </label>
              <button type="submit" className="btn btn-primary btn-full">
                Send Message →
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">DBG</span>
              <strong className="brand-name">Digital Brands Growth</strong>
            </a>
            <p>Premium digital marketing services for startups, local businesses, and growth-focused brands.</p>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Instagram">IG</a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {serviceItems.map((s) => (
                <li key={s.title}><a href="#services">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About DBG</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="https://www.rapiddigitalgrowth.com/blogs" target="_blank" rel="noreferrer">Blogs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <p>info@digitalbrandsgrowth.com</p>
            <p>+91 83681 23312</p>
            <a className="btn btn-ghost footer-cta" href="#contact">
              Free Consultation
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {currentYear} Digital Brands Growth. All rights reserved.</p>
          <a href="#home">↑ Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
