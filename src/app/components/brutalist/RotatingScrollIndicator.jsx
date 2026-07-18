/* 1.5 RotatingScrollIndicator — 144px circle, mono text on a circular path
   rotating 360deg/12s, static icon centered. Reused as a "response time"
   badge on the Contact page via the `label` / `centerIcon` props. */
export default function RotatingScrollIndicator({
    label = "SCROLL DOWN",
    centerIcon,
    size = 144,
    className = "",
}) {
    // Repeat the label around the ring with square separators.
    const ring = `${label} • `.repeat(4);
    const arrow = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
    );

    return (
        <div
            className={`bx-rsi ${className}`}
            aria-hidden="true"
            style={{ width: size, height: size, position: "relative" }}
        >
            <svg className="bx-spin" width={size} height={size} viewBox="0 0 144 144">
                <defs>
                    <path id="bxRsiPath" d="M72,72 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
                </defs>
                <text fill="var(--text-primary)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="2.4">
                    <textPath href="#bxRsiPath" startOffset="0">{ring}</textPath>
                </text>
            </svg>
            <span className="bx-rsi-arrow">{centerIcon || arrow}</span>
        </div>
    );
}
