import React from "react";

/**
 * HeroVideo — standalone video section.
 * The hero's main video is now built directly into App.jsx's hero-video-pane.
 * Use this component if you want a separate full-width video elsewhere on the page.
 */
export default function HeroVideo({ src, poster, autoplay = false }) {
  return (
    <section className="standalone-video-section section reveal-on-scroll">
      <div className="container">
        <div className="standalone-video-wrap">
          <video
            className="standalone-player"
            playsInline
            preload="metadata"
            poster={poster}
            controls={!autoplay}
            {...(autoplay
              ? { autoPlay: true, muted: true, loop: true }
              : {})}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

/* Add to App.css if you use this standalone:
.standalone-video-section { background: var(--off-white); padding-block: 4rem; }
.standalone-video-wrap {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lift);
  aspect-ratio: 16 / 9;
  background: var(--navy-mid);
}
.standalone-player { width: 100%; height: 100%; object-fit: cover; }
*/
