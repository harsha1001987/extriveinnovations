"use client";

import { useRef, useState } from "react";

/* 1.1 IgniteText — outline text that fills accent on hover; on touch it
   fills on tap and holds ~1.5s. `pulse` variant (for already-orange text)
   does a brightness/scale pulse instead of a fill. Display-scale only. */
export default function IgniteText({
    as: Tag = "span",
    pulse = false,
    className = "",
    children,
    ...rest
}) {
    const [lit, setLit] = useState(false);
    const timer = useRef(null);

    const ignite = () => {
        setLit(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLit(false), 1500);
    };

    return (
        <Tag
            className={`bx-ignite ${pulse ? "pulse" : ""} ${lit ? "lit" : ""} ${className}`}
            onPointerDown={ignite}
            {...rest}
        >
            {children}
        </Tag>
    );
}
