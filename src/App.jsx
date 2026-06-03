import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Services", "Work", "Process", "About", "Contact"];

const services = [
  {
    title: "Websites",
    kicker: "High-converting web experiences",
    copy: "Editorial layouts, sharp performance, and premium interaction systems for brands that need to look expensive and convert.",
  },
  {
    title: "Applications",
    kicker: "SaaS, dashboards, portals",
    copy: "Product interfaces designed for clarity, speed, and repeated use across customer, team, and admin workflows.",
  },
  {
    title: "Growth Systems",
    kicker: "Funnels, SEO, paid media",
    copy: "Acquisition systems that connect creative direction with measurable revenue, retention, and qualified demand.",
  },
  {
    title: "Brand Motion",
    kicker: "Cinematic digital identity",
    copy: "Launch films, interaction language, and motion principles that make your brand feel unmistakably premium.",
  },
];

const caseStudies = [
  {
    title: "Aurum Capital",
    type: "Fintech Platform",
    metric: "+184% qualified pipeline",
    image: "/images/services/service-1.jpg",
  },
  {
    title: "Vanta Studio",
    type: "Luxury Commerce",
    metric: "3.8x conversion lift",
    image: "/images/services/service-2.jpg",
  },
  {
    title: "Helio Health",
    type: "Healthcare Experience",
    metric: "42% lower bounce rate",
    image: "/images/services/service-3.jpg",
  },
];

const process = [
  ["01", "Discover", "We audit the brand, market, audience, and revenue path before a single pixel moves."],
  ["02", "Design", "We craft a cinematic interface system with hierarchy, motion, and conversion logic."],
  ["03", "Develop", "We build fast, responsive, scalable frontends with clean implementation details."],
  ["04", "Grow", "We refine, launch, track, and optimize the product around commercial outcomes."],
];

const testimonials = [
  {
    quote:
      "They transformed our site from a brochure into a serious sales asset. The brand finally feels as premium as the product.",
    name: "Rhea Kapoor",
    role: "Founder, Maison Labs",
  },
  {
    quote:
      "The team thinks like a creative studio and executes like a growth partner. That combination is rare.",
    name: "Arjun Mehta",
    role: "CEO, Northstar Cloud",
  },
  {
    quote:
      "Every interaction felt intentional. Our customers noticed the upgrade within the first week.",
    name: "Nisha Rao",
    role: "Marketing Lead, Elevate",
  },
];

const stats = [
  ["72", "Projects Launched", "+"],
  ["5", "Avg Growth Multiple", "x"],
  ["48", "Launch Sprints", "h"],
  ["92", "Client Retention", "%"],
];

function usePremiumMotion(loaderDone) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

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
        yPercent: 115,
        opacity: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08,
      });

      gsap.utils.toArray(".gsap-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          },
        );
      });

      gsap.utils.toArray(".parallax-media").forEach((item) => {
        gsap.to(item, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray(".stat-number").forEach((item) => {
        const target = Number(item.dataset.value);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          onUpdate: () => {
            item.textContent = Math.round(counter.value).toString();
          },
        });
      });
    });

    return () => ctx.revert();
  }, [loaderDone]);
}

function LoadingScreen({ done }) {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <video className="loader-video" autoPlay muted loop playsInline>
        <source src="/videos/hero-demo.mp4" type="video/mp4" />
      </video>
      <div className="loader-scrim" />
      <motion.div
        className="loader-logo"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      >
        DBG
      </motion.div>
      <div className="loader-progress">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const year = new Date().getFullYear();
  const cursorRef = useRef(null);

  usePremiumMotion(loaderDone);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderDone(true), 2100);
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
      <LoadingScreen done={loaderDone} />
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="site-shell">
        <header className="site-header">
          <a className="brand" href="#home" aria-label="DBG home">
            <span>DBG</span>
            <strong>Digital Brands Growth</strong>
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <a className="nav-cta" href="#contact">
            Start a Project
          </a>
        </header>

        <main>
          <section id="home" className="hero-section">
            <video className="hero-video" autoPlay muted loop playsInline poster="/images/video-poster.jpg">
              <source src="/videos/hero-demo.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="eyebrow reveal-text">Premium Digital Agency</p>
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
                transition={{ delay: 0.25, duration: 0.9 }}
              >
                We design and develop high-performance websites, applications, and digital
                products for ambitious brands.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 24 }}
                animate={loaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42, duration: 0.9 }}
              >
                <a className="button button-primary" href="#contact">
                  Start a Project
                </a>
                <a className="button button-ghost" href="#work">
                  View Our Work
                </a>
              </motion.div>
            </div>
            <div className="hero-meta">
              <span>Strategy</span>
              <span>Design</span>
              <span>Development</span>
              <span>Growth</span>
            </div>
          </section>

          <section id="services" className="section services-section">
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">Capabilities</p>
              <h2>Premium execution across every layer of the digital experience.</h2>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article className="glass-card service-card gsap-reveal" key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p className="service-kicker">{service.kicker}</p>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="section work-section">
            <div className="section-heading section-heading-wide gsap-reveal">
              <p className="eyebrow">Featured Case Studies</p>
              <h2>Large-format digital products built to feel inevitable.</h2>
            </div>
            <div className="case-grid">
              {caseStudies.map((project) => (
                <article className="case-card gsap-reveal" key={project.title}>
                  <div className="case-media">
                    <img className="parallax-media" src={project.image} alt={`${project.title} project mockup`} />
                  </div>
                  <div className="case-content">
                    <div>
                      <p>{project.type}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <strong>{project.metric}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="section process-section">
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">Process</p>
              <h2>A clear path from ambitious idea to measurable launch.</h2>
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
            <div className="about-media gsap-reveal">
              <img className="parallax-media" src="/images/services/service-4.jpg" alt="Agency strategy workspace" />
            </div>
            <div className="about-copy gsap-reveal">
              <p className="eyebrow">About Agency</p>
              <h2>We are built for brands that want presence, performance, and polish.</h2>
              <p>
                DBG combines creative direction, product thinking, and growth marketing
                into one senior-led studio. The result is not a personal portfolio site;
                it is a commercial-grade digital presence designed to justify serious
                project investments.
              </p>
              <div className="about-list">
                <span>Brand systems</span>
                <span>Conversion strategy</span>
                <span>Motion direction</span>
                <span>Performance builds</span>
              </div>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-inner gsap-reveal">
              <p className="eyebrow">Contact CTA</p>
              <h2>Ready to build something that looks premium and sells like it?</h2>
              <p>Projects typically range from ₹50,000 to ₹5,00,000+ depending on scope, speed, and growth goals.</p>
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
          <span>DBG © {year}</span>
          <span>Premium digital experiences for ambitious brands.</span>
        </footer>
      </div>
    </>
  );
}

export default App;
