import { Link } from "react-router-dom";
import text from "../text.json";

const site = text.site || {};
const contact = text.contact || {};

function renderMarkedText(value) {
  if (!value) return null;
  const parts = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) parts.push(value.slice(lastIndex, match.index));
    parts.push(<span className="highlight" key={match.index}>{match[1]}</span>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < value.length) parts.push(value.slice(lastIndex));
  return parts;
}

export default function ContactPage() {
  const contactEmail = ((contact.actions || []).map((action) => action.href || "").find((href) => href.startsWith("mailto:")) || "mailto:info@digitalbrandsgrowth.com").replace("mailto:", "");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`New project enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  };

  return (
    <div className="site-shell contact-page">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={`${site.brandName || "DBG"} home`}>
          <img className="brand-logo" src={site.logo || "/logo.png"} alt={`${site.brandName || "DBG"} logo`} />
          <strong>{site.brandShort || site.brandName}</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/#home">Home</Link>
          <Link to="/#services">Services</Link>
          <Link to="/#work">Portfolio</Link>
          <Link to="/#process">Process</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="header-actions"><a className="nav-cta" href={`mailto:${contactEmail}`}>Let’s Talk</a></div>
      </header>
      <main>
        <section className="contact-section">
          <div className="contact-inner">
            <div className="contact-copy">
              <img className="contact-logo" src={site.logo || "/logo.png"} alt="" />
              <p className="eyebrow">{contact.eyebrow}</p>
              <h1>{renderMarkedText(contact.heading)}</h1>
              <p>{contact.copy}</p>
              <div className="contact-actions">{(contact.actions || []).map((action, index) => <a className={`button button-${action.variant === "primary" ? "primary" : "ghost"}`} href={action.href} key={`${action.label}-${index}`}>{action.label}</a>)}</div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label><span>Name</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>Message</span><textarea name="message" rows="5" required /></label>
              <button className="button button-primary" type="submit">Send Message</button>
              <p>We usually reply within 24 hours.</p>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <img className="footer-logo" src={site.logoWhite || "/logo-white.png"} alt={`${site.brandName || "DBG"} logo`} />
        <span>{site.footerPrefix} {site.footerYearSeparator} {new Date().getFullYear()}</span><span>{site.footerText}</span>
      </footer>
    </div>
  );
}
