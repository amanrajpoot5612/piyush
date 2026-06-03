import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const heroVideo = "/WhatsApp%20Video%202026-05-31%20at%203.15.20%20PM.mp4";

const navItems = ["Services", "Work", "Process", "About", "Contact"];

const services = [
  {
    title: "Website Design",
    copy: "Responsive, SEO-ready websites with modern layouts, fast loading, and clean brand storytelling.",
    points: ["Mobile-first design", "CMS-ready structure", "Conversion sections"],
  },
  {
    title: "SEO Services",
    copy: "Technical, local, and content-led SEO programs designed to increase search visibility and qualified traffic.",
    points: ["Website audits", "Keyword strategy", "On-page optimization"],
  },
  {
    title: "Social Marketing",
    copy: "Platform-specific social campaigns that build audience trust and make your brand visible every week.",
    points: ["Content calendars", "Creative direction", "Community growth"],
  },
  {
    title: "Paid Ads",
    copy: "Google, Meta, and marketplace campaigns built around ROI, audience segmentation, and testing.",
    points: ["Funnel setup", "Creative testing", "Budget optimization"],
  },
];

const caseStudies = [
  ["Healthcare Growth", "Local SEO + website redesign", "+68% qualified calls"],
  ["Restaurant Launch", "Social content + paid ads", "4.2x return on ad spend"],
  ["Real Estate Funnel", "Landing pages + Google Ads", "+132% lead volume"],
];

const process = [
  ["01", "Research", "We study your category, competitors, customers, and existing digital performance."],
  ["02", "Strategy", "We map the website, campaign plan, SEO priorities, and conversion journey."],
  ["03", "Build", "We design, develop, write, optimize, and launch with polished execution."],
  ["04", "Scale", "We track results, improve campaigns, and keep growth moving with clear reporting."],
];

const testimonials = [
  {
    quote: "The website finally looks like a serious business asset. It is clean, fast, and much easier for clients to trust.",
    name: "Rhea Kapoor",
    role: "Founder, Maison Labs",
  },
  {
    quote: "Their team gave us the strategy, creatives, and campaign structure we were missing.",
    name: "Arjun Mehta",
    role: "Director, Northstar Cloud",
  },
  {
    quote: "The blue and white design feels premium but still approachable for our customers.",
    name: "Nisha Rao",
    role: "Marketing Lead, Elevate",
  },
];

const stats = [
  ["50", "Happy Clients", "+"],
  ["70", "Average ROI", "%"],
  ["8", "Years Experience", "+"],
  ["4", "Traffic Growth", "x"],
];

function usePageMotion(loaderDone) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.9 });
    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loaderDone) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.07,
      });

      gsap.utils.toArray(".gsap-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%" },
          },
        );
      });

      gsap.utils.toArray(".stat-number").forEach((item) => {
        const target = Number(item.dataset.value);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          onUpdate: () => {
            item.textContent = Math.round(counter.value).toString();
          },
        });
      });

      gsap.to(".video-card", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [loaderDone]);
}

function LoadingScreen({ done, theme }) {
  return (
    <motion.div
      className={`loader ${theme === "light" ? "loader-light" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      <video className="loader-video" autoPlay muted loop playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="loader-scrim" />
      <motion.div
        className="loader-logo"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      >
        RDG
      </motion.div>
      <div className="loader-progress">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.75, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [theme, setTheme] = useState("light");
  const year = new Date().getFullYear();
  const cursorRef = useRef(null);

  usePageMotion(loaderDone);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderDone(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;
    const move = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <LoadingScreen done={loaderDone} theme={theme} />
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className={`site-shell theme-${theme}`}>
        <header className="site-header">
          <a className="brand" href="#home" aria-label="RDG home">
            <span>RDG</span>
            <strong>Rapid Digital Growth</strong>
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <a className="nav-cta" href="#contact">
              Let's Talk
            </a>
          </div>
        </header>

        <main>
          <section id="home" className="hero-section">
            <div className="hero-bg" aria-hidden="true" />
            <div className="hero-content">
              <p className="eyebrow reveal-text">Digital Marketing Agency in India</p>
              <h1>
                <span className="line-mask">
                  <span className="reveal-text">Building Digital</span>
                </span>
                <span className="line-mask">
                  <span className="reveal-text">Experiences That</span>
                </span>
                <span className="line-mask">
                  <span className="reveal-text">Drive Growth</span>
                </span>
              </h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 24 }}
                animate={loaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.85 }}
              >
                We design and develop high-performance websites, applications, and digital
                products for ambitious brands.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 24 }}
                animate={loaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42, duration: 0.85 }}
              >
                <a className="button button-primary" href="#contact">
                  Start a Project
                </a>
                <a className="button button-ghost" href="#work">
                  View Our Work
                </a>
              </motion.div>
            </div>

            <motion.div
              className="video-card"
              initial={{ opacity: 0, y: 38, scale: 0.96 }}
              animate={loaderDone ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.32, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="video-toolbar">
                <span />
                <span />
                <span />
                <strong>Growth Studio Reel</strong>
              </div>
              <div className="video-frame">
                <video autoPlay muted loop playsInline controls>
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
              <div className="video-caption">
                <span>Landscape brand video</span>
                <strong>Strategy + Design + Marketing</strong>
              </div>
            </motion.div>

            <div className="hero-meta">
              <span>SEO</span>
              <span>Website Design</span>
              <span>Social Media</span>
              <span>Paid Ads</span>
            </div>
          </section>

          <section id="services" className="section services-section">
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">What We Do</p>
              <h2>Boost your brand with expert digital marketing services.</h2>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article className="glass-card service-card gsap-reveal" key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="section work-section">
            <div className="section-heading section-heading-wide gsap-reveal">
              <p className="eyebrow">Featured Case Studies</p>
              <h2>Professional campaigns presented with a premium agency finish.</h2>
            </div>
            <div className="case-grid">
              {caseStudies.map(([title, type, metric]) => (
                <article className="case-card gsap-reveal" key={title}>
                  <div className="case-visual">
                    <video autoPlay muted loop playsInline>
                      <source src={heroVideo} type="video/mp4" />
                    </video>
                  </div>
                  <div className="case-content">
                    <div>
                      <p>{type}</p>
                      <h3>{title}</h3>
                    </div>
                    <strong>{metric}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="section process-section">
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">Company Process</p>
              <h2>From digital strategy to measurable growth.</h2>
            </div>
            <div className="timeline">
              {process.map(([number, title, copy]) => (
                <article className="timeline-item gsap-reveal" key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section testimonials-section">
            <div className="testimonial-strip gsap-reveal">
              {testimonials.map((item) => (
                <figure className="testimonial-card" key={item.name}>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="stats-section gsap-reveal" aria-label="Agency statistics">
            {stats.map(([value, label, suffix]) => (
              <div className="stat-card" key={label}>
                <strong>
                  <span className="stat-number" data-value={value}>
                    0
                  </span>
                  {suffix}
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </section>

          <section id="about" className="section about-section">
            <div className="about-video gsap-reveal">
              <video autoPlay muted loop playsInline controls>
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
            <div className="about-copy gsap-reveal">
              <p className="eyebrow">Welcome to RDG</p>
              <h2>Shaping digital journeys with a passionate growth agency.</h2>
              <p>
                We blend creativity, technology, SEO, social media, paid campaigns,
                and website development to help businesses build trust and grow with
                clarity. The layout is light, polished, and blue-led like a modern RDG-style
                agency page, while still keeping the premium studio energy.
              </p>
              <div className="about-list">
                <span>Hospitals</span>
                <span>Restaurants</span>
                <span>Education</span>
                <span>Real Estate</span>
                <span>E-Commerce</span>
              </div>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-inner gsap-reveal">
              <p className="eyebrow">Let's Build Together</p>
              <h2>Ready to launch a cleaner, faster, more premium digital presence?</h2>
              <p>Projects can be shaped for practical growth packages or premium custom builds from Rs 50,000 to Rs 5,00,000+.</p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:info@digitalbrandsgrowth.com">
                  Start a Project
                </a>
                <a className="button button-ghost" href="tel:+918368123312">
                  +91 83681 23312
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <span>RDG © {year}</span>
          <span>White and blue digital marketing landing page.</span>
        </footer>
      </div>
    </>
  );
}

export default App;
