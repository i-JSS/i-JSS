import React from "react";

interface TechBadgeProps {
    label: string;
    size?: "sm" | "md";
}

const TechBadge = React.memo(function TechBadge({label, size = "md"}: TechBadgeProps) {
    return (
        <span
            className={`rounded-md bg-secondary border border-border font-mono ${
                size === "sm"
                    ? "px-2.5 py-1 text-[11px]"
                    : "px-2.5 py-1 text-xs"
            }`}
        >
      {label}
    </span>
    );
});

export default TechBadge;
