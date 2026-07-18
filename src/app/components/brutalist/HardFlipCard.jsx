/* 1.2 HardFlipCard — bordered card that hard-flips to a full orange fill
   (black text) on hover/focus-within. Children use currentColor so they
   invert together. Pass `as={Link}` + href to make the whole card a link. */
export default function HardFlipCard({ as: Tag = "div", className = "", children, ...rest }) {
    return (
        <Tag className={`bx-flip ${className}`} {...rest}>
            {children}
        </Tag>
    );
}
