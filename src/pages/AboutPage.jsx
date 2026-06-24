import React from "react";
import { Link } from "react-router-dom";
import text from "../text.json";

const about = text.about || {};
const site = text.site || {};
const media = text.media || {};

function renderMarkedText(textStr) {
  if (!textStr) return null;
  const parts = [];
  let lastIndex = 0;
  const pattern = /\*\*(.+?)\*\*/g;
  let match;

  while ((match = pattern.exec(textStr)) !== null) {
    if (match.index > lastIndex) {
      parts.push(textStr.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < textStr.length) {
    parts.push(textStr.slice(lastIndex));
  }

  return parts.length ? parts : textStr;
}

export default function AboutPage() {
  return (
    <div className="site-shell about-page">
      <header className="site-header">
        <Link className="brand" to="/">
          <img
            className="brand-logo"
            src={site.logo || "/logo.png"}
            alt={site.brandName || "Logo"}
          />
          <strong>{site.brandShort || site.brandName}</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/">Services</Link>
          <Link to="/">Portfolio</Link>
          <Link to="/">Process</Link>
          <Link to="/about">About</Link>
          <Link to="/">Contact</Link>
        </nav>
        <div className="header-actions">
          <a className="nav-cta" href="/#contact">
            Let’s Talk
          </a>
        </div>
      </header>

      <main>
        <section className="section about-hero-section">
          <div className="about-copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1>{renderMarkedText(about.heading)}</h1>
            {about.subheading ? (
              <p className="about-subheading">
                {renderMarkedText(about.subheading)}
              </p>
            ) : null}
            {about.intro?.paragraphs?.map((paragraph, index) => (
              <p key={`intro-${index}`}>{paragraph}</p>
            ))}
          </div>
          {about.intro?.image ? (
            <div className="about-hero-image">
              <img
                src={about.intro.image}
                alt={about.intro.imageAlt || "About image"}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}
        </section>

        {about.missionVision ? (
          <section className="section about-mission-section">
            <div className="section-heading">
              <p className="eyebrow">{about.missionVision.eyebrow}</p>
              {about.missionVision.heading ? (
                <h2>{renderMarkedText(about.missionVision.heading)}</h2>
              ) : null}
            </div>
            <div className="mission-vision-grid">
              {about.missionVision.items?.map((item, index) => (
                <article className="mission-card" key={`mission-${index}`}>
                  <strong>{item.label}</strong>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {about.philosophy ? (
          <section className="section about-philosophy-section">
            <div className="section-heading">
              <p className="eyebrow">{about.philosophy.eyebrow}</p>
              <h2>{renderMarkedText(about.philosophy.heading)}</h2>
            </div>
            <div className="philosophy-grid">
              {about.philosophy.items?.map((item) => (
                <article className="philosophy-card" key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {about.growthChart ? (
          <section className="section about-growth-section">
            <div className="section-heading">
              <p className="eyebrow">{about.growthChart.eyebrow}</p>
              <h2>{renderMarkedText(about.growthChart.heading)}</h2>
            </div>
            <div className="growth-chart-grid">
              {about.growthChart.series?.map((item, index) => (
                <article className="chart-card" key={`chart-${index}`}>
                  <strong>
                    {item.value}
                    {item.suffix}
                  </strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
            {about.growthChart.trendLine ? (
              <div className="growth-trend">
                <span className="trend-label">{about.growthChart.trendLine.label}</span>
                <div className="trend-points">
                  {about.growthChart.trendLine.points?.map((point) => (
                    <div key={point.month} className="trend-point">
                      <strong>{point.month}</strong>
                      <span>{point.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {about.approach ? (
          <section className="section about-approach-section">
            <div className="section-heading">
              <p className="eyebrow">{about.approach.eyebrow}</p>
              <h2>{renderMarkedText(about.approach.heading)}</h2>
            </div>
            <div className="approach-grid">
              {about.approach.items?.map((item) => (
                <article className="approach-card" key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {about.whyChooseUs ? (
          <section className="section about-why-section">
            <div className="section-heading">
              <p className="eyebrow">{about.whyChooseUs.eyebrow}</p>
              <h2>{renderMarkedText(about.whyChooseUs.heading)}</h2>
            </div>
            <div className="why-grid">
              {about.whyChooseUs.items?.map((item, index) => (
                <article className="why-card" key={`why-${index}`}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {about.capabilities ? (
          <section className="section about-capabilities-section">
            <div className="section-heading">
              <p className="eyebrow">{about.capabilities.eyebrow}</p>
              <h2>{renderMarkedText(about.capabilities.heading)}</h2>
            </div>
            <div className="capabilities-grid">
              {about.capabilities.groups?.map((group, index) => (
                <article className="capability-card" key={`cap-${index}`}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items?.map((item, idx) => (
                      <li key={`${group.title}-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {about.gallery ? (
          <section className="section about-gallery-section">
            <div className="section-heading">
              <p className="eyebrow">{about.gallery.eyebrow}</p>
              <h2>A Look Inside</h2>
            </div>
            <div className="gallery-grid">
              {about.gallery.images?.map((image, index) => (
                <div className="gallery-card" key={`gallery-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt || "About gallery image"}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {about.closingCta ? (
          <section className="section about-closing-section">
            <div className="closing-cta-card">
              <div>
                <h2>{renderMarkedText(about.closingCta.heading)}</h2>
                <p>{about.closingCta.copy}</p>
              </div>
              <a className="button button-primary" href={about.closingCta.action?.href || "#contact"}>
                {about.closingCta.action?.label || "Start a Project"}
              </a>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="site-footer">
        <img
          className="footer-logo"
          src={site.logoWhite || "/logo-white.png"}
          alt={site.brandName || "logo"}
        />
        <span>
          {site.footerPrefix} {site.footerYearSeparator} {new Date().getFullYear()}
        </span>
        <span>{site.footerText}</span>
      </footer>
    </div>
  );
}
