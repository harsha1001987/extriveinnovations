import StatusMarquee from "./StatusMarquee";

/* 1.6 SkewedMarquee — full-width band skewed -2deg, two stacked rows
   scrolling opposite directions (children counter-skewed to read level). */
export default function SkewedMarquee({ topItems = [], bottomItems = [], className = "" }) {
    return (
        <div className={`bx-skew ${className}`} aria-hidden="true">
            <div className="bx-skew-row">
                <StatusMarquee items={topItems} duration={16} separator="square" className="bx-skew-top" />
            </div>
            <div className="bx-skew-row">
                <StatusMarquee items={bottomItems} duration={22} reverse separator="square" className="bx-skew-bottom" />
            </div>
        </div>
    );
}
