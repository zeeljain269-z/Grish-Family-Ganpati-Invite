import { resolveAsset } from "../lib/assets";
import { timeline, saveTheDate } from "../data/utsav";
import { location } from "../data/location";
import { ui } from "../data/ui";
import { Reveal } from "./Reveal";
import { shows } from "../data/sections";

// Each schedule event renders as one card on a centre line. An event
// carries a title and any of date / time / location, and only the lines it
// actually has are printed - so a half-filled schedule still looks
// deliberate.
function eventLines(event) {
  return [event.date, event.time, event.location].filter(Boolean);
}

// Cards alternate down the line. The shared schema stamps a side on every
// event the customer enters; the theme's own sample data does not, so fall
// back to the row's position.
function sideOf(event, index) {
  if (event.side === "left" || event.side === "right") return event.side;
  return index % 2 === 0 ? "left" : "right";
}

// Build a Google Calendar link from the save-the-date stamps.
function calendarUrl(event, venue) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.summary || ui.calendarFallback,
    dates: `${event.start}/${event.end}`,
  });
  if (venue) params.set("location", venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function Utsav() {
  // This design keeps the date inside the programme, so switching the
  // programme off takes the section with it, and switching the date off
  // leaves the programme and drops only the add-to-calendar button.
  if (!shows("timeline")) return null;

  const deco = resolveAsset("topDeco");
  const divider = resolveAsset("divider");
  const events = (timeline.events ?? []).filter((e) => e?.title);
  const calendar = (saveTheDate.events ?? []).find((e) => e?.start && e?.end);

  return (
    <section className="section utsav-section">
      <img alt="" className="utsav-deco utsav-deco-top" src={deco} />
      <img alt="" className="utsav-deco utsav-deco-bottom" src={deco} />

      <Reveal className="utsav-content">
        {timeline.tag ? <p className="utsav-tag">{timeline.tag}</p> : null}
        {timeline.heading ? <h2 className="utsav-heading">{timeline.heading}</h2> : null}
        <img alt="" className="utsav-divider" src={divider} />

        {events.length > 0 && (
          // The line holds still and the cards do the moving: the whole
          // timeline rising at once landed as a slab, where a card at a
          // time reads as the programme being dealt out.
          <div className="utsav-timeline">
            <span aria-hidden="true" className="utsav-timeline__line" />
            {events.map((event, i) => (
              <Reveal
                className={`utsav-event utsav-event--${sideOf(event, i)}`}
                delay={0.06 + i * 0.085}
                key={event.id ?? i}
                variant="pop"
              >
                <span aria-hidden="true" className="utsav-event__node" />
                <div className="utsav-event__card">
                  {event.label && event.label !== event.title ? (
                    <span className="utsav-event__label">{event.label}</span>
                  ) : null}
                  <h3>{event.title}</h3>
                  {eventLines(event).map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {calendar && shows("saveTheDate") && (
          <Reveal className="utsav-actions" delay={0.2}>
            <a
              className="utsav-btn"
              href={calendarUrl(calendar, location.venue)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2.5" />
                <path d="M3 9.5h18M8 3v4M16 3v4" />
              </svg>
              {ui.calendarLabel}
            </a>
          </Reveal>
        )}
      </Reveal>
    </section>
  );
}
