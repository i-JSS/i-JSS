import React, {memo, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import {fadeUp, fadeUpReduced, pick, slideLeftChild, slideLeftChildReduced, staggerParent,} from "@/lib/animate";
import SectionIndex from "@/app/components/ui/SectionIndex";
import TechBadge from "@/app/components/ui/TechBadge";
import type {Experience} from "@/types";
import type {Translations} from "@/lib/i18n";

// ─── Experience item ──────────────────────────────────────────────────────────

interface ExperienceItemProps {
    exp: Experience;
    index: number;
    reduced: boolean | null;
    tr: Translations["experience"];
}

const ExperienceItem = memo(function ExperienceItem({
                                                        exp,
                                                        index,
                                                        reduced,
                                                        tr,
                                                    }: ExperienceItemProps) {
    const [expanded, setExpanded] = useState(false);
    const slide = pick(reduced, slideLeftChild, slideLeftChildReduced);

    return (
        <motion.article
            variants={slide}
            className="relative mb-6 pl-14"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            aria-label={`${exp.title} at ${exp.company}`}
        >
            {/* Timeline node */}
            <div
                aria-hidden="true"
                className={`absolute left-[11px] top-5 h-[17px] w-[17px] rounded-full border-2 transition-all duration-300 ${
                    exp.current
                        ? "border-primary bg-primary shadow-lg shadow-primary/30"
                        : expanded
                            ? "border-primary/60 bg-background"
                            : "border-border bg-background"
                }`}
            />
            {exp.current && (
                <div
                    aria-hidden="true"
                    className="absolute left-[11px] top-5 h-[17px] w-[17px] rounded-full bg-primary animate-ping opacity-30 motion-reduce:animate-none"
                />
            )}

            <div
                className={`rounded-xl border bg-card p-6 transition-all duration-200 shadow-sm ${
                    expanded ? "border-primary/40 shadow-md" : "border-border"
                }`}
            >
                {/* Header — always visible */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-base">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{exp.company}</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">{exp.institution}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-xs font-mono text-muted-foreground">
                            {exp.start} — {exp.end ?? tr.present}
                        </p>
                        {exp.current && (
                            <span
                                className="inline-block mt-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-[10px] text-green-500 font-medium">
                {tr.current}
              </span>
                        )}
                    </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: "auto"}}
                            exit={{opacity: 0, height: 0}}
                            transition={
                                reduced
                                    ? {duration: 0.15}
                                    : {duration: 0.22, ease: [0.16, 1, 0.3, 1] as const}
                            }
                            className="overflow-hidden"
                        >
                            <div className="mt-5 pt-5 border-t border-border">
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                    {exp.description}
                                </p>

                                <div className="mb-5">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono mb-2.5">
                                        {tr.technologies}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.technologies.map((tech) => (
                                            <TechBadge key={tech} label={tech} size="sm"/>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono mb-2.5">
                                        {tr.achievements}
                                    </p>
                                    <ul className="space-y-1.5 list-none">
                                        {exp.achievements.map((a, i) => (
                                            <li key={i}
                                                className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary shrink-0" aria-hidden="true">→</span>
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.article>
    );
});

// ─── Section ──────────────────────────────────────────────────────────────────

interface ExperienceSectionProps {
    experiences: Experience[];
    tr: Translations;
}

function sortExperiences(list: Experience[]): Experience[] {
    return [...list].sort((a, b) => {
        if (!a.end && !b.end) return 0;
        if (!a.end) return -1;
        if (!b.end) return 1;
        return b.end.localeCompare(a.end);
    });
}

export default function ExperienceSection({experiences, tr}: ExperienceSectionProps) {
    const reduced = useReducedMotion();
    const headerV = pick(reduced, fadeUp, fadeUpReduced);
    const sorted = sortExperiences(experiences);

    return (
        <section id="experience" aria-label={tr.experience.title} className="py-28 px-6 lg:px-12">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    className="relative mb-14"
                    variants={headerV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, margin: "-60px"}}
                >
                    <SectionIndex num="02"/>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                        {tr.experience.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{tr.experience.subtitle}</p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
                    />

                    <motion.div
                        variants={staggerParent(0.12)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true, margin: "-40px"}}
                    >
                        {sorted.map((exp, index) => (
                            <ExperienceItem
                                key={`${exp.company}-${exp.start}`}
                                exp={exp}
                                index={index}
                                reduced={reduced}
                                tr={tr.experience}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
