import { resolveAsset } from "../lib/assets";
import { gallery } from "../data/gallery";
import { shows } from "../data/sections";
import { Reveal } from "./Reveal";

// The memories wall.
//
// Every colour here comes from the same tokens the venue and programme
// cards use - --card-bg, --card-border, --color-gold-primary - and none is
// written out. That is deliberate: this design has already been repaletted
// once (the block at the foot of index.css turned it from night blue to
// blush and rose without touching a line of the original), and a wall with
// its own hardcoded colours would have been the one section left behind.
//
// Each card keeps a 4:5 portrait window whatever shape the photograph is,
// because a wall of matched frames is the effect - but the photograph is
// covered rather than stretched, so nobody at the edge is squeezed out.
export function Gallery() {
  // Nothing to show is not a heading over a hole: a customer who removes
  // every photograph loses the wall rather than keeping its title, and a
  // family in their first year has no past years to hang.
  const photos = (gallery.photos ?? []).filter((photo) => photo?.url);
  if (!photos.length || !shows("gallery")) return null;

  return (
    <section className="memories-section">
      <div className="memories-inner">
        <Reveal>
          {gallery.tag ? <p className="memories-tag">{gallery.tag}</p> : null}
          {gallery.heading ? <h2 className="memories-heading">{gallery.heading}</h2> : null}
          {gallery.subtitle ? <p className="memories-subtitle">{gallery.subtitle}</p> : null}
          <img alt="" className="memories-divider" src={resolveAsset("divider")} />
        </Reveal>

        <div className="memories-wall">
          {photos.map((photo, index) => (
            <Reveal className="memories-mount" delay={0.06 * index} key={photo.url ?? index}>
              <figure>
                <span className="memories-window">
                  {/* The year is already on the plate below, so the alt text
                      carries it rather than reading it out twice. */}
                  <img
                    alt={photo.caption ? `Bappa at our home, ${photo.caption}` : "Bappa at our home"}
                    loading="lazy"
                    src={resolveAsset(photo.url)}
                  />
                </span>
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
