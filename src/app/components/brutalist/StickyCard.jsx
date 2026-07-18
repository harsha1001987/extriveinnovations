/* 1.10 StickyCard — sticks at top:8rem so successive cards stack/overlap
   as the user scrolls past them (physical scroll stacking, no transforms). */
export default function StickyCard({ className = "", style = {}, children }) {
    return (
        <div className={`bx-sticky ${className}`} style={style}>
            {children}
        </div>
    );
}
