import React from "react";

interface SectionIndexProps {
    num: string;
}

const SectionIndex = React.memo(function SectionIndex({num}: SectionIndexProps) {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-4 right-0 font-black leading-none opacity-[0.035] text-foreground font-mono"
            style={{fontSize: "clamp(5rem,14vw,11rem)"}}
        >
      {num}
    </span>
    );
});

export default SectionIndex;
