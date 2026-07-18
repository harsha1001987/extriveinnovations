import Link from "next/link";

/* 1.8 Button — primary (filled accent), outline (hard flip to white),
   ghost (text→accent). Sizes sm/md/lg. `pill` for rounded CTAs. Renders a
   Link when `href` is set, otherwise a <button> (or `as`). */
export default function BxButton({
    variant = "primary",
    size = "md",
    pill = false,
    as,
    href,
    className = "",
    children,
    ...rest
}) {
    const cls = [
        "bx-btn",
        `bx-btn--${variant}`,
        size !== "md" ? `bx-btn--${size}` : "",
        pill ? "bx-btn--pill" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (href) {
        return (
            <Link href={href} className={cls} {...rest}>
                {children}
            </Link>
        );
    }
    const Tag = as || "button";
    return (
        <Tag className={cls} {...rest}>
            {children}
        </Tag>
    );
}
