/* 1.3 MassiveNumber — oversized decorative numeral in the muted tone,
   sits behind content as a graphic shape. Always aria-hidden. */
export default function MassiveNumber({ children, size = "9rem", className = "", style = {} }) {
    return (
        <span
            aria-hidden="true"
            className={`bx-massive ${className}`}
            style={{ fontSize: size, ...style }}
        >
            {children}
        </span>
    );
}
