import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import text from "./text.json";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const content = text && typeof text === "object" ? text : {};
const asArray = (value) => (Array.isArray(value) ? value : []);
const asObject = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value : {};
const asText = (value) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";
const asButtonVariant = (value) => (value === "primary" ? "primary" : "ghost");
const sectionId = (value) => asText(value);

const renderMarkedText = (value) => {
  const text = asText(value);
  if (!text.includes("**")) return text;

  const parts = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span className="highlight" key={`${match[1]}-${match.index}`}>
        {match[1]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const site = asObject(content.site);
const media = asObject(content.media);
const navigation = asObject(content.navigation);
const loader = asObject(content.loader);
const hero = asObject(content.hero);
const services = asObject(content.services);
const work = asObject(content.work);
const processSection = asObject(content.process);
const testimonials = asObject(content.testimonials);
const stats = asObject(content.stats);
const about = asObject(content.about);
const contact = asObject(content.contact);

function usePageMotion(loaderDone) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const scrollToAnchor = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -96,
        duration: 1.15,
        onComplete: () => window.history.replaceState(null, "", hash),
      });
    };

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);
    document.addEventListener("click", scrollToAnchor);

    return () => {
      document.removeEventListener("click", scrollToAnchor);
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
        const target = Number(item.dataset.value) || 0;
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

      gsap.fromTo(
        ".roadmap-progress",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".roadmap",
            start: "top 76%",
          },
        },
      );

      gsap.utils.toArray(".roadmap-step").forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 34, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: "back.out(1.25)",
            scrollTrigger: {
              trigger: ".roadmap",
              start: "top 74%",
            },
          },
        );
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

function VideoSource({ src: source, type } = {}) {
  const src = asText(source) || asText(media.heroVideo);
  if (!src) return null;
  return (
    <source
      src={src}
      type={asText(type) || asText(media.videoType) || undefined}
    />
  );
}

function ActionLink({ action }) {
  const item = asObject(action);
  const label = asText(item.label);
  const href = asText(item.href) || "#";
  if (!label) return null;

  return (
    <a className={`button button-${asButtonVariant(item.variant)}`} href={href}>
      {label}
    </a>
  );
}

function LoadingScreen({ done }) {
  return (
    <motion.div
      className="loader loader-light"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      <video className="loader-video" autoPlay muted loop playsInline>
        <VideoSource />
      </video>
      <div className="loader-scrim" />
      <motion.div
        className="loader-logo"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src={asText(site.logo) || "/logo.png"}
          alt={`${asText(site.brandName) || "Company"} logo`}
        />
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

  const brandShort = asText(site.brandShort);
  const brandName = asText(site.brandName);
  const navItems = asArray(navigation.items);
  const navigationCta = asObject(navigation.cta);
  const heroBrandLogos = asObject(hero.brandLogos);
  const marqueeBrandLogos = asArray(heroBrandLogos.marquee);
  const featuredBrandLogos = asArray(heroBrandLogos.featured).slice(0, 4);

  return (
    <>
      <LoadingScreen done={loaderDone} />
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="site-shell">
        <header className="site-header">
          <a
            className="brand"
            href={asText(site.homeHref) || "#"}
            aria-label={asText(site.brandAriaLabel)}
          >
            <img
              className="brand-logo"
              src={asText(site.logo) || "/logo.png"}
              alt={`${brandName || "Logo"} logo`}
            />
            <strong>{brandName}</strong>
          </a>
          <nav aria-label={asText(navigation.ariaLabel)}>
            {navItems.map((item, index) => {
              const navItem = asObject(item);
              const label = asText(navItem.label);
              if (!label) return null;
              return (
                <a key={`${label}-${index}`} href={asText(navItem.href) || "#"}>
                  {label}
                </a>
              );
            })}
          </nav>
          <div className="header-actions">
            <a className="nav-cta" href={asText(navigationCta.href) || "#"}>
              {asText(navigationCta.label)}
            </a>
          </div>
        </header>

        <main>
          <section id={sectionId(hero.id)} className="hero-section">
            <div className="hero-bg" aria-hidden="true" />

            <motion.div
              className="video-card"
              initial={{ opacity: 0, y: 38, scale: 0.96 }}
              animate={loaderDone ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.32,
                duration: 1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              {/* <div className="video-toolbar">
                <span />
                <span />
                <span />
                <strong>{asText(asObject(hero.video).title)}</strong>
              </div> */}

              <video autoPlay muted loop playsInline>
                <VideoSource />
              </video>

              {/* Decorative images layered over the video (decorative - aria-hidden) */}

              {/* <div className="video-caption">
                <span>{asText(asObject(hero.video).caption)}</span>
                <strong>{asText(asObject(hero.video).captionStrong)}</strong>
              </div> */}
            </motion.div>

            <div className="hero-content">
              <p className="eyebrow reveal-text">{asText(hero.eyebrow)}</p>
              <h1>
                {asArray(hero.headlineLines).map((line, index) => (
                  <span className="line-mask" key={`${asText(line)}-${index}`}>
                    <span className="reveal-text">
                      {renderMarkedText(line)}
                    </span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 24 }}
                animate={loaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.85 }}
              >
                {asText(hero.subtitle)}
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 24 }}
                animate={loaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42, duration: 0.85 }}
              >
                {asArray(hero.actions).map((action, index) => (
                  <ActionLink
                    action={action}
                    key={`${asText(asObject(action).label)}-${index}`}
                  />
                ))}
              </motion.div>
            </div>

            {/* <div
              className="hero-meta"
              aria-label={asText(heroBrandLogos.marqueeLabel)}
            >
              <div className="brand-logo-marquee">
                <div className="brand-logo-track">
                  {[...marqueeBrandLogos, ...marqueeBrandLogos].map(
                    (brand, index) => {
                      const item = asObject(brand);
                      const name = asText(item.name);
                      const logo = asText(item.logo);
                      if (!logo) return null;

                      return (
                        <div
                          className="brand-logo-tile"
                          key={`${name || "brand"}-${index}`}
                        >
                          <img src={logo} alt={`${name || "Brand"} logo`} />
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div
                className="brand-logo-static"
                aria-label={asText(heroBrandLogos.featuredLabel)}
              >
                {featuredBrandLogos.map((brand, index) => {
                  const item = asObject(brand);
                  const name = asText(item.name);
                  const logo = asText(item.logo);
                  if (!logo) return null;

                  return (
                    <div
                      className="brand-logo-tile"
                      key={`${name || "featured-brand"}-${index}`}
                    >
                      <img src={logo} alt={`${name || "Brand"} logo`} />
                    </div>
                  );
                })}
              </div>
            </div> */}
          </section>

          <section
            id={sectionId(services.id)}
            className="section services-section"
          >
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">{asText(services.eyebrow)}</p>
              <h2>{renderMarkedText(services.heading)}</h2>
            </div>
            <div className="services-grid horizontal">
              {asArray(services.items).map((service, index) => {
                const item = asObject(service);
                const title = asText(item.title);
                const imageUrl = asText(item.image);
                return (
                  <article
                    className="glass-card service-card gsap-reveal"
                    key={`${title}-${index}`}
                  >
                    <span>{asText(item.number)}</span>
                    {imageUrl ? (
                      <div className="service-card-image">
                        <img
                          src={imageUrl}
                          alt={asText(item.imageAlt) || `${title} example`}
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <h3>{title}</h3>
                    <p>{asText(item.copy)}</p>
                    <ul>
                      {asArray(item.points).map((point, pointIndex) => (
                        <li key={`${asText(point)}-${pointIndex}`}>
                          {asText(point)}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          <section id={sectionId(work.id)} className="section work-section">
            <div className="section-heading section-heading-wide gsap-reveal">
              <p className="eyebrow">{asText(work.eyebrow)}</p>
              <h2>{renderMarkedText(work.heading)}</h2>
            </div>
            <div className="case-grid">
              {asArray(work.items).map((project, index) => {
                const item = asObject(project);
                const title = asText(item.title);
                const videoUrl = asText(item.video);
                return (
                  <article
                    className="case-card gsap-reveal"
                    key={`${title}-${index}`}
                  >
                    {videoUrl ? (
                      <div className="case-visual">
                        <video autoPlay muted loop playsInline>
                          <VideoSource
                            src={videoUrl}
                            type={asText(item.videoType)}
                          />
                        </video>
                      </div>
                    ) : null}
                    <div className="case-content">
                      <div>
                        <p>{asText(item.type)}</p>
                        <h3>{title}</h3>
                      </div>
                      <strong>{asText(item.metric)}</strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            id={sectionId(processSection.id)}
            className="section process-section"
          >
            <div className="section-heading gsap-reveal">
              <p className="eyebrow">{asText(processSection.eyebrow)}</p>
              <h2>{renderMarkedText(processSection.heading)}</h2>
            </div>
            <div className="roadmap" aria-label="Growth process roadmap">
              <svg
                className="roadmap-path"
                viewBox="0 0 820 560"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="roadmapGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#22c6ff" />
                    <stop offset="52%" stopColor="#0a7cff" />
                    <stop offset="100%" stopColor="#0756c9" />
                  </linearGradient>
                </defs>
                <path
                  className="roadmap-path-base"
                  d="M90 90 C330 20 480 210 720 130 C520 230 350 285 150 260 C360 400 560 345 730 470"
                  pathLength="1"
                />
                <path
                  className="roadmap-progress"
                  d="M90 90 C330 20 480 210 720 130 C520 230 350 285 150 260 C360 400 560 345 730 470"
                  pathLength="1"
                />
              </svg>
              {asArray(processSection.items).map((step, index) => {
                const item = asObject(step);
                const title = asText(item.title);
                return (
                  <article
                    className="roadmap-step"
                    style={{ "--step-index": index }}
                    key={`${title}-${index}`}
                  >
                    <span className="roadmap-node">{asText(item.number)}</span>
                    <div className="roadmap-card">
                      <p>Phase {asText(item.number)}</p>
                      <h3>{title}</h3>
                      <span>{asText(item.copy)}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="section testimonials-section">
            <div className="testimonial-strip gsap-reveal">
              {asArray(testimonials.items).map((testimonial, index) => {
                const item = asObject(testimonial);
                const name = asText(item.name);
                return (
                  <figure className="testimonial-card" key={`${name}-${index}`}>
                    <blockquote>{asText(item.quote)}</blockquote>
                    <figcaption>
                      <strong>{name}</strong>
                      <span>{asText(item.role)}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          <section
            className="stats-section gsap-reveal"
            aria-label={asText(stats.ariaLabel)}
          >
            {asArray(stats.items).map((stat, index) => {
              const item = asObject(stat);
              const label = asText(item.label);
              const value = asText(item.value);
              return (
                <div className="stat-card" key={`${label}-${index}`}>
                  <strong>
                    <span className="stat-number" data-value={value}>
                      {asText(stats.initialValue)}
                    </span>
                    {asText(item.suffix)}
                  </strong>
                  <span>{label}</span>
                </div>
              );
            })}
          </section>

          {/* <section id={sectionId(about.id)} className="section about-section">
            <div className="about-video gsap-reveal">
              <video autoPlay muted loop playsInline controls>
                <VideoSource />
              </video>
            </div>
            <div className="about-copy gsap-reveal">
              <p className="eyebrow">{asText(about.eyebrow)}</p>
              <h2>{asText(about.heading)}</h2>
              <p>{asText(about.copy)}</p>
              <div className="about-list">
                {asArray(about.tags).map((tag, index) => (
                  <span key={`${asText(tag)}-${index}`}>{asText(tag)}</span>
                ))}
              </div>
            </div>
          </section> */}

          <section id={sectionId(contact.id)} className="contact-section">
            <div className="contact-inner gsap-reveal">
              <img
                className="contact-logo"
                src={asText(site.logo) || "/logo.png"}
                alt={`${brandName || "Company"} logo`}
              />
              <p className="eyebrow">{asText(contact.eyebrow)}</p>
              <h2>{renderMarkedText(contact.heading)}</h2>
              <p>{asText(contact.copy)}</p>
              <div className="contact-actions">
                {asArray(contact.actions).map((action, index) => (
                  <ActionLink
                    action={action}
                    key={`${asText(asObject(action).label)}-${index}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <img
            className="footer-logo"
            src={asText(site.logoWhite) || "/logo-white.png"}
            alt={`${brandName || "Company"} logo`}
          />
          <span>
            {asText(site.footerPrefix)} {asText(site.footerYearSeparator)}{" "}
            {year}
          </span>
          <span>{asText(site.footerText)}</span>
        </footer>
      </div>
    </>
  );
}

export default App;
