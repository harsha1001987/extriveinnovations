/* 1.4 StatusMarquee — infinite linear horizontal scroll, no edge fade,
   never pauses (except reduced-motion, handled by the global stylesheet).
   Two identical segments so a -50% translate loops seamlessly. Decorative
   only — mark the accessible copy of the data elsewhere on the page.

   `items`: array of React nodes. `separator`: "square" | "dot" | "none". */
export default function StatusMarquee({
    items = [],
    duration = 30,
    reverse = false,
    separator = "square",
    className = "",
}) {
    const Sep = () =>
        separator === "none" ? null : separator === "dot" ? (
            <span aria-hidden="true">•</span>
        ) : (
            <span className="bx-sq" aria-hidden="true" />
        );

    const Segment = () => (
        <div className="bx-marquee-seg" aria-hidden="true">
            {items.map((item, i) => (
                <span className="bx-marquee-item" key={i}>
                    <Sep />
                    <span>{item}</span>
                </span>
            ))}
        </div>
    );

    return (
        <div className={`bx-marquee ${className}`} aria-hidden="true">
            <div
                className={`bx-marquee-track ${reverse ? "rev" : ""}`}
                style={{ "--bx-dur": `${duration}s` }}
            >
                <Segment />
                <Segment />
            </div>
        </div>
    );
}
