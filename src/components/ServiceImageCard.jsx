export default function ServiceImageCard({ title, description, image, alt }) {
  return (
    <article className="service-image-card">
      <div className="service-image-wrap">
        <img src={image} alt={alt || title} loading="lazy" />
      </div>
      <div className="service-image-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
