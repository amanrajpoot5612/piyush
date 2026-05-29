import { useEffect, useState } from "react";
import "./App.css";

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
  },
];

const packageCards = [
  {
    title: "Website Packages",
    subtitle: "Smart websites for fast-growing brands.",
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
    items: [
      "Social media planning",
      "Paid ads management",
      "Conversion funnels",
      "Monthly reporting",
    ],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
          element.classList.add("revealed");
        }
      });
    };

    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home">
            <span>DBG</span>
            <strong>Digital Brands Growth</strong>
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
              className="button button-secondary"
              onClick={() => {
                setBusinessOpen(true);
                setMenuOpen(false);
              }}
            >
              Business
            </button>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              aria-label="Open menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-top">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setBusinessOpen(true);
              setMenuOpen(false);
            }}
          >
            Business
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
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
        <a className="button button-primary mobile-cta" href="#contact">
          Let’s Talk
        </a>
      </div>

      <aside className={`business-panel ${businessOpen ? "open" : ""}`}>
        <div className="business-panel-inner">
          <div className="business-panel-head">
            <div>
              <p className="eyebrow">Business</p>
              <h3>Industry Expertise</h3>
            </div>
            <button
              type="button"
              className="icon-button"
              aria-label="Close business panel"
              onClick={() => setBusinessOpen(false)}
            >
              ×
            </button>
          </div>
          <ul className="business-list">
            {businessCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main>
        <section id="home" className="hero-section section reveal-on-scroll">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                Premium digital marketing agency in India
              </p>
              <h1>We build brands that generate traffic, leads and revenue.</h1>
              <p className="hero-description">
                From SEO and social media to paid campaigns and website design,
                DBG helps ambitious brands grow with premium digital strategy.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Get Started
                </a>
                <a className="button button-secondary" href="#services">
                  View Services
                </a>
              </div>
              <div className="hero-badges">
                <div>
                  <strong>50+</strong>
                  <span>Happy Clients</span>
                </div>
                <div>
                  <strong>70%</strong>
                  <span>Average ROI</span>
                </div>
                <div>
                  <strong>8+</strong>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>

            <div className="hero-panel">
              <span className="panel-label">About Us</span>
              <h2>WELCOME TO DBG</h2>
              <p>
                Shaping digital journeys with a passionate digital marketing
                agency in India. We blend creativity, technology and performance
                to help brands stand out and grow online.
              </p>
              <ul className="hero-panel-list">
                <li>Custom campaigns for startup and enterprise growth.</li>
                <li>Brand-first storytelling with measurable marketing.</li>
                <li>
                  Full-service digital solutions from strategy to execution.
                </li>
              </ul>
              <a className="button button-outline" href="#about">
                Read More
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section section reveal-on-scroll">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="eyebrow">About Us</p>
              <h2>Shaping digital journeys with strategic marketing.</h2>
              <p>
                DBG is a premium digital marketing agency focused on helping
                businesses in India and beyond to build authority, capture
                demand, and scale sustainably.
              </p>
              <p>
                We deliver polished websites, powerful SEO, engaging social
                campaigns and ROI-focused ad programs—all with clarity,
                communication, and digital-first intelligence.
              </p>
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

        <section
          id="services"
          className="services-section section reveal-on-scroll"
        >
          <div className="container section-header">
            <p className="eyebrow">What We Do</p>
            <h2>Boost Your Brand with Expert Digital Marketing Services</h2>
            <p>
              Full-service marketing designed for growth, visibility and
              business results.
            </p>
          </div>

          <div className="container services-grid">
            {serviceItems.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className="service-link" href="#contact">
                  Read More →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="packages"
          className="packages-section section reveal-on-scroll"
        >
          <div className="container section-header">
            <p className="eyebrow">Packages</p>
            <h2>Choose a package for your next growth stage</h2>
            <p>
              Simple, smart packages that make it easy to start marketing with
              confidence.
            </p>
          </div>

          <div className="container packages-grid">
            {packageCards.map((pkg) => (
              <div key={pkg.title} className="package-card">
                <h3>{pkg.title}</h3>
                <p>{pkg.subtitle}</p>
                <ul>
                  {pkg.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="button button-secondary" href="#contact">
                  Explore Package
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact-section section reveal-on-scroll"
        >
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Let’s Build Your Growth Story</p>
              <h2>Ready to launch your next digital campaign?</h2>
              <p>
                Contact DBG for a free consultation, campaign strategy or brand
                growth plan.
              </p>
              <div className="contact-details">
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+918368123312">+91 83681 23312</a>
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@digitalbrandsgrowth.com">
                    info@digitalbrandsgrowth.com
                  </a>
                </div>
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
                <textarea rows="5" placeholder="Tell us about your goals" />
              </label>
              <button type="submit" className="button button-primary">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span>DBG</span>
              <strong>Digital Brands Growth</strong>
            </a>
            <p>
              Premium digital marketing services for startups, local businesses,
              and growth-focused brands.
            </p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {serviceItems.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <a href="#services">{service.title}</a>
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
                <a href="#packages">Packages</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>info@digitalbrandsgrowth.com</p>
            <p>+91 83681 23312</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {currentYear} Digital Brands Growth — Designed by DBG</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
