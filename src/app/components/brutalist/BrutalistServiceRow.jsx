import Image from "next/image";

/* 1.7 BrutalistServiceRow — index · title + status tags (+ optional inline
   stat / monochrome sponsor icon) · 45deg arrow revealed on hover. Renders
   as a link when `href` is supplied. */
export default function BrutalistServiceRow({
    index,
    title,
    tags = [],
    stat,
    icon,
    iconMode = "white",
    href,
    as,
    className = "",
    ...rest
}) {
    const Tag = as || (href ? "a" : "div");
    return (
        <Tag className={`bx-srow ${className}`} href={href} {...rest}>
            <span className="bx-srow-index">{index}</span>

            {icon && (
                <span className={`bx-srow-icon bx-srow-icon--${iconMode}`} aria-hidden="true">
                    <Image src={icon} alt="" width={44} height={44} style={{ objectFit: "contain" }} />
                </span>
            )}

            <span className="bx-srow-main">
                <span className="bx-srow-title">{title}</span>
                <span className="bx-srow-tags">
                    {tags.map((t, i) => (
                        <span key={i} className={`bx-tag ${t.live ? "bx-tag--live" : ""}`}>
                            {t.live && <span className="bx-tag-dot" />}
                            {t.label}
                        </span>
                    ))}
                    {stat && <span className="bx-srow-stat">{stat}</span>}
                </span>
            </span>

            <span className="bx-srow-arrow" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" />
                </svg>
            </span>
        </Tag>
    );
}
