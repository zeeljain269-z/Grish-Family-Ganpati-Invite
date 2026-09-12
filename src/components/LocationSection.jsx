import { resolveAsset } from "../lib/assets";
import { location } from "../data/location";
import { mapEmbedSrc, mapDirectionsHref } from "../lib/maps";
import { ui } from "../data/ui";
import { Reveal } from "./Reveal";

const lines = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);

export function LocationSection() {
  const divider = resolveAsset("divider");
  const note = lines(location.footerMessage);
  const embed = mapEmbedSrc(location);
  const directions = mapDirectionsHref(location);

  return (
    <section className="section location-section">
      <Reveal className="location-content">
        {location.tag ? <p className="location-tag">{location.tag}</p> : null}
        {location.heading ? <h2 className="location-heading">{location.heading}</h2> : null}
        <img alt="" className="location-divider" src={divider} />

        <Reveal className="map-card" delay={0.1}>
          {embed ? (
            <div className="map-preview">
              <iframe
                title={location.venue || "Venue map"}
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay" />
            </div>
          ) : null}

          <div className="map-info">
            <div className="map-address">
              {location.venue ? <h3>{location.venue}</h3> : null}
              {location.address ? <p>{location.address}</p> : null}
            </div>
            {directions ? (
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
              >
                {ui.mapsButton}
              </a>
            ) : null}
          </div>

          {note.map((line, i) => (
            <div className="map-note" key={i}>{line}</div>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
