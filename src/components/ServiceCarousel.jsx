import React, { useState, useEffect, useRef } from "react";
import ServiceImageCard from "./ServiceImageCard";

export default function ServiceCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4500);
    return () => clearInterval(id);
  }, [items.length]);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  if (!items.length) return null;

  return (
    <div className="service-carousel">
      <div className="carousel-viewport">
        <div className="carousel-track" ref={trackRef}>
          {items.map((it) => (
            <div className="carousel-slide" key={it.title}>
              {it.image ? (
                <ServiceImageCard
                  title={it.title}
                  description={it.description}
                  image={it.image}
                />
              ) : (
                <article className="service-card">
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </article>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
        >
          ‹
        </button>
        <div className="dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
