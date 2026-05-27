import {motion, useReducedMotion} from "motion/react";
import {scrollToSection} from "@/lib/scroll";
import type {Translations} from "@/lib/i18n";

interface HeroSectionProps {
    tr: Translations;
    totalProjects: number;
    totalExperiences: number;
}

export default function HeroSection({tr, totalProjects, totalExperiences}: HeroSectionProps) {
    const reduced = useReducedMotion();

    const fadeIn = reduced
        ? {hidden: {opacity: 0}, show: {opacity: 1, transition: {duration: 0.3}}}
        : {
            hidden: {opacity: 0, y: 24},
            show: {opacity: 1, y: 0, transition: {duration: 0.7, ease: [0.16, 1, 0.3, 1] as const}}
        };

    const metrics = [
        {value: String(totalProjects)+'+', label: tr.hero.metrics.projects},
        {value: String(totalExperiences), label: tr.hero.metrics.experiences},
        {value: "6", label: tr.hero.metrics.teaching},
        {value: "1", label: tr.hero.metrics.titles},
    ];

    return (
        <section
            id="sobre"
            aria-label="Introduction"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
            {/* Radial spotlight */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(61,142,255,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Oversized faded name — editorial backdrop */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
        <span
            className="font-black tracking-tighter uppercase text-foreground opacity-[0.032] leading-none whitespace-nowrap"
            style={{fontSize: "clamp(56px, 16vw, 200px)"}}
        >
          GINUINO
        </span>
            </div>

            <div className="relative mx-auto max-w-5xl px-6 lg:px-12 text-center">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                >
                    <h1
                        className="mb-5 font-black tracking-tight leading-none"
                        style={{fontSize: "clamp(2.8rem,9vw,7rem)"}}
                    >
                        João Ginuino
                    </h1>

                    {/* Animated accent line */}
                    <motion.div
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        transition={
                            reduced
                                ? {duration: 0.2}
                                : {delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const}
                        }
                        className="mx-auto mb-6 h-px w-24 bg-primary origin-left"
                        aria-hidden="true"
                    />

                    <p className="mb-6 text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                        {tr.hero.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#projects");
                            }}
                            className="px-7 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all text-sm"
                        >
                            {tr.hero.cta_projects}
                        </a>
                        <a
                            href="#experience"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#experience");
                            }}
                            className="px-7 py-3 border border-border bg-card rounded-lg font-semibold hover:bg-secondary hover:border-primary/30 active:scale-95 transition-all text-sm shadow-sm"
                        >
                            {tr.hero.cta_experience}
                        </a>
                    </div>

                    {/* Metrics */}
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {metrics.map(({ value, label }) => (
                            <div
                                key={label}
                                className="text-center rounded-xl border border-border bg-card/60 py-5 px-4 shadow-sm flex flex-col"
                            >
                                <dd className="text-3xl font-black font-mono text-foreground h-10 flex items-center justify-center">
                                    {value}
                                </dd>

                                <dt className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                    {label}
                                </dt>
                            </div>
                        ))}
                    </dl>
                </motion.div>

            </div>
        </section>
    );
}
