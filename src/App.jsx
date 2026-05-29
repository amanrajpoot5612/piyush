import { useEffect, useMemo, useState } from "react";
import "./App.css";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why DBG", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const heroStats = [
  { label: "Total Visitors", value: "98.4K" },
  { label: "Conversion Rate", value: "18.7%" },
  { label: "Revenue Uplift", value: "+42%" },
];

const quickStats = [
  { value: 50, label: "Happy Clients", suffix: "+" },
  { value: 100, label: "Projects Completed", suffix: "+" },
  { value: 8, label: "Services Offered", suffix: "+" },
  { value: 3, label: "Years of Experience", suffix: "+" },
];

const serviceOverview = [
  { title: "SEO", description: "Search visibility that drives growth." },
  { title: "SMO", description: "Organic social systems for brand lift." },
  { title: "SMM", description: "Paid social campaigns that convert." },
  { title: "Google Ads", description: "Performance ads with measurable ROAS." },
  {
    title: "Website Design",
    description: "Pixel-perfect sites for premium brands.",
  },
  {
    title: "Offline Marketing",
    description: "Local campaigns that support digital traction.",
  },
  {
    title: "Portfolio Design",
    description: "Presentation assets that attract clients.",
  },
  {
    title: "Visiting Card Design",
    description: "Premium stationery for first impressions.",
  },
];

const deepSections = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    theme: "dark",
    intro:
      "Drive consistent growth with SEO built for startups and service businesses.",
    offers: [
      "Technical SEO audits and schema setup",
      "Keyword research with buyer intent",
      "On-page optimization for conversion",
      "Content pillar planning and tracking",
    ],
    results: [
      "Improved keyword rankings",
      "Higher organic traffic",
      "Better lead quality",
      "Stronger domain authority",
    ],
  },
  {
    id: "social",
    title: "Social Media Optimization",
    theme: "light",
    intro:
      "Build a consistent social identity across the platforms where your audience lives.",
    offers: [
      "Profile refresh for modern brands",
      "Content calendar creation",
      "Engagement optimization",
      "Platform-specific growth strategies",
    ],
    results: ["Instagram", "Facebook", "LinkedIn", "Twitter", "YouTube"],
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    theme: "dark",
    intro:
      "Campaigns focused on awareness, leads, and revenue from social channels.",
    offers: [
      "Audience targeting and split testing",
      "Lead generation funnels",
      "Creative ad copy and visuals",
      "Performance monitoring and optimization",
    ],
    results: [
      "Funnel campaigns",
      "Awareness ads",
      "Lead magnets",
      "Retargeting",
      "Sales conversion",
    ],
  },
  {
    id: "ads",
    title: "Google Ads Management",
    theme: "light",
    intro:
      "High-intent paid search and discovery campaigns that lower cost per lead.",
    offers: [
      "Search campaign setup",
      "Smart shopping and discovery",
      "Display remarketing",
      "Budget optimization by ROI",
    ],
    results: [
      "Search Ads",
      "Performance Max",
      "Display",
      "YouTube",
      "Remarketing",
    ],
  },
  {
    id: "web",
    title: "Website Design & Development",
    theme: "dark",
    intro: "Modern, conversion-first websites built for credibility and speed.",
    offers: [
      "Landing pages with strong CTAs",
      "Mobile-first UX design",
      "Fast hosting and SEO-ready code",
      "Brand-led visuals and storytelling",
    ],
    results: [
      "Corporate websites",
      "Landing pages",
      "Portfolio sites",
      "E-commerce funnels",
      "Service microsites",
    ],
  },
  {
    id: "offline",
    title: "Offline Marketing",
    theme: "light",
    intro:
      "Support digital growth with local outreach and brand visibility offline.",
    offers: [
      "Flyers and pamphlets",
      "POS displays and hoardings",
      "Event promotion materials",
      "Local outreach plans",
    ],
    results: [
      "Local sales",
      "Brand recall",
      "Footfall growth",
      "Community events",
      "Partnerships",
    ],
  },
  {
    id: "design",
    title: "Portfolio & Visiting Card Design",
    theme: "dark",
    intro: "Brand assets designed to make every first impression feel premium.",
    offers: [
      "Portfolio layout systems",
      "Visiting card mockups",
      "Brand consistency guidelines",
      "Print-ready artwork",
    ],
    results: [
      "Creative portfolios",
      "Executive cards",
      "Branded stationery",
      "Pitch-ready designs",
      "Visual assets",
    ],
  },
];

const whyChoose = [
  {
    title: "Creative Growth Systems",
    text: "Strategy, design and performance combined for measurable brand growth.",
  },
  {
    title: "Lean Remote Model",
    text: "Lower overhead means better value for every marketing rupee.",
  },
  {
    title: "Transparent Reporting",
    text: "Weekly updates, dashboards and clear campaign results.",
  },
  {
    title: "Flexible Packages",
    text: "Solutions crafted for startups, local businesses, and scaling brands.",
  },
  {
    title: "Brand-first Execution",
    text: "Design-led campaigns that build trust and authority online.",
  },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Founder, Urban Bites",
    quote:
      "DBG helped our local brand become the go-to choice for premium customers.",
  },
  {
    name: "Rohan Mehta",
    role: "CEO, Radiant Studio",
    quote:
      "The growth plan was sharp, fast and easy to measure. Their campaigns delivered.",
  },
  {
    name: "Sana Kapoor",
    role: "Marketing Head, Blueleaf",
    quote: "The website redesign and ads strategy boosted our leads by 3x.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    services: 0,
    years: 0,
  });

  const currentYear = new Date().getFullYear();

  const ctaLink =
    "https://wa.me/919289223227?text=Hello%20DBG%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project.";

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.querySelector("#stats");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targetValues = [50, 100, 8, 3];
    const keys = ["clients", "projects", "services", "years"];
    const durations = [1400, 1400, 1400, 1400];
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / Math.max(...durations), 1);
      setCounters({
        clients: Math.round(targetValues[0] * progress),
        projects: Math.round(targetValues[1] * progress),
        services: Math.round(targetValues[2] * progress),
        years: Math.round(targetValues[3] * progress),
      });
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  }, [statsVisible]);

  const navMarkup = useMemo(
    () => (
      <nav className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    ),
    [],
  );

  return (
    <div className="page-shell">
      <header className="site-header reveal-on-scroll">
        <div className="header-inner">
          <a className="brand" href="#hero">
            <span>DBG</span>
            <strong>Digital Brands Growth</strong>
          </a>
          <div className="desktop-nav">{navMarkup}</div>
          <div className="header-actions">
            <a
              className="button button-primary"
              href={ctaLink}
              target="_blank"
              rel="noreferrer"
            >
              Get a Free Consultation
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="mobile-cta"
          href={ctaLink}
          target="_blank"
          rel="noreferrer"
        >
          Free Consultation
        </a>
      </div>

      <main>
        <section id="hero" className="hero-section section reveal-on-scroll">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">DIGITAL BRANDS GROWTH</span>
              <h1>
                Building Brands That <span>Dominate</span>
              </h1>
              <p className="hero-text">
                We Don't Just Market Brands — We Build Growth. Strategy ·
                Creativity · Performance.
              </p>
              <div className="hero-buttons">
                <a
                  className="button button-primary"
                  href={ctaLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Growing →
                </a>
                <a className="button button-ghost" href="#services">
                  View Our Services
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-card">
                <div className="dashboard-head">
                  <div>
                    <span>DBG Analytics</span>
                    <strong>Live performance sketch</strong>
                  </div>
                  <div className="chip">Growth</div>
                </div>
                <div className="dashboard-metrics">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="dashboard-metric">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="dashboard-chart">
                  <div className="chart-line" />
                  <div className="chart-point point-1" />
                  <div className="chart-point point-2" />
                  <div className="chart-point point-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="chevron" />
          </div>
        </section>

        <section id="stats" className="stats-strip section reveal-on-scroll">
          <div className="stats-inner">
            <div className="stat-card">
              <span>
                {counters.clients}
                {quickStats[0].suffix}
              </span>
              <p>{quickStats[0].label}</p>
            </div>
            <div className="stat-card">
              <span>
                {counters.projects}
                {quickStats[1].suffix}
              </span>
              <p>{quickStats[1].label}</p>
            </div>
            <div className="stat-card">
              <span>
                {counters.services}
                {quickStats[2].suffix}
              </span>
              <p>{quickStats[2].label}</p>
            </div>
            <div className="stat-card">
              <span>
                {counters.years}
                {quickStats[3].suffix}
              </span>
              <p>{quickStats[3].label}</p>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section reveal-on-scroll">
          <div className="section-header">
            <span className="eyebrow">FOUNDER'S INTRODUCTION</span>
            <h2>Hi, I'm Piyush Vashisht</h2>
            <p>Founder & CEO — Digital Brands Growth</p>
          </div>
          <div className="about-grid">
            <div className="profile-card">
              <div className="photo-shell">
                <div className="photo-placeholder">P</div>
              </div>
              <div className="badge">₹2.45M Revenue Generated</div>
            </div>
            <div className="about-copy">
              <ul className="about-list">
                <li>Launches that turn local brands into category leaders.</li>
                <li>
                  Performance marketing with creative brand-first campaigns.
                </li>
                <li>
                  Remote first team giving premium work without premium fees.
                </li>
                <li>Data-driven growth systems focused on measurable ROI.</li>
              </ul>
              <p className="signature">— Piyush Vashisht</p>
            </div>
          </div>
        </section>

        <section
          id="philosophy"
          className="section mission-section reveal-on-scroll"
        >
          <div className="mission-grid">
            <div className="feature-card dark-card">
              <span className="eyebrow">Our Mission</span>
              <h3>
                Power ambitious brands with marketing that feels modern and
                measurable.
              </h3>
              <ul>
                <li>Launch growth-driven brand stories.</li>
                <li>Create campaigns that keep scaling.</li>
                <li>Build systems for predictable results.</li>
                <li>Keep costs lean with remote delivery.</li>
                <li>Focus on revenue, not just vanity metrics.</li>
              </ul>
            </div>
            <div className="feature-card light-card">
              <span className="eyebrow">Our Vision</span>
              <h3>
                Make premium digital growth accessible for startups and growing
                businesses.
              </h3>
              <ul>
                <li>Trust comes from consistency, not noise.</li>
                <li>Creative strategy should always be measurable.</li>
                <li>Brands deserve campaigns built around customers.</li>
                <li>Every project should feel like a partnership.</li>
                <li>Growth should be clear, calm and continuous.</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="section services-overview reveal-on-scroll"
        >
          <div className="section-header">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>Our Complete Service Portfolio</h2>
            <p>
              Premium services designed for brand growth, digital traction and
              conversion.
            </p>
          </div>
          <div className="services-grid">
            {serviceOverview.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-icon" aria-hidden="true">
                  •
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  href={`#${service.title.toLowerCase().replace(/\s+/g, "")}`}
                  className="service-link"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </section>

        {deepSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`section deep-dive ${section.theme === "dark" ? "deep-dark" : "deep-light"} reveal-on-scroll`}
          >
            <div className="deep-grid">
              <div className="deep-copy">
                <span className="eyebrow">
                  {section.title.split(" ")[0].toUpperCase()}
                </span>
                <h2>{section.title}</h2>
                <p>{section.intro}</p>
                <div className="deep-content">
                  <div>
                    <h3>What We Offer</h3>
                    <ul>
                      {section.offers.map((offer) => (
                        <li key={offer}>{offer}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>
                      {section.theme === "light"
                        ? "Platforms & Outcomes"
                        : "Results You Can Expect"}
                    </h3>
                    <ul className="result-list">
                      {section.results.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="deep-visual">
                <div className="feature-panel">
                  <span>Strategy</span>
                  <strong>{section.title}</strong>
                  <p>{section.intro}</p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="why" className="section why-section reveal-on-scroll">
          <div className="section-header">
            <span className="eyebrow">Why Choose DBG</span>
            <h2>Why Choose Digital Brands Growth?</h2>
          </div>
          <div className="why-grid">
            {whyChoose.map((item, index) => (
              <div key={item.title} className="why-card">
                <div className="why-index">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="why-highlight">
            <p>
              By working remotely, we save on overhead — so you get more value
              for every rupee.
            </p>
          </div>
        </section>

        <section
          id="testimonials"
          className="section testimonials-section reveal-on-scroll"
        >
          <div className="section-header">
            <span className="eyebrow">What Our Clients Say</span>
            <h2>Client Feedback & Results</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <div key={item.name} className="testimonial-card">
                <div className="quote-mark">“</div>
                <p>{item.quote}</p>
                <div className="testimonial-author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section reveal-on-scroll"
        >
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">Let’s Build Your Growth Story</span>
              <h2>Ready to launch your next phase?</h2>
              <p>
                Contact DBG for a free consultation, campaign audit, or brand
                growth strategy.
              </p>
              <div className="contact-info">
                <div>
                  <strong>Website</strong>
                  <a
                    href="https://www.digitalbrandsgrowth.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    digitalbrandsgrowth.com
                  </a>
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@digitalbrandsgrowth.com">
                    info@digitalbrandsgrowth.com
                  </a>
                </div>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+919289223227">+91 92892 23227</a>
                </div>
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
                  <option>Offline Marketing</option>
                </select>
              </label>
              <label>
                Message
                <textarea rows="5" placeholder="Tell us about your goals" />
              </label>
              <button type="submit" className="button button-primary">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer reveal-on-scroll">
        <div className="footer-grid">
          <div>
            <a className="brand footer-brand" href="#hero">
              <span>DBG</span>
              <strong>Digital Brands Growth</strong>
            </a>
            <p>
              Premium digital marketing for startups, local businesses and
              fast-growing brands.
            </p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {serviceOverview.slice(0, 4).map((item) => (
                <li key={item.title}>
                  <a href={`#${item.title.toLowerCase().replace(/\s+/g, "")}`}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#why">Why DBG</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>info@digitalbrandsgrowth.com</p>
            <p>+91 92892 23227</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} Digital Brands Growth — Designed & Built by DBG</p>
          <a href="#hero">Back to top</a>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={ctaLink}
        target="_blank"
        rel="noreferrer"
      >
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
