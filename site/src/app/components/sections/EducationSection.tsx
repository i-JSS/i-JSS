import React, {memo} from "react";
import {motion, useReducedMotion} from "motion/react";
import {ExternalLink} from "lucide-react";
import {fadeUp, fadeUpChild, fadeUpChildReduced, fadeUpReduced, pick, staggerParent,} from "@/lib/animate";
import SectionIndex from "@/app/components/ui/SectionIndex";
import type {Translations} from "@/lib/i18n";
import unbImage from "../../../assets/unb.png";
import cnaImage from "../../../assets/cna.png";
import { CERTS } from "../../../data/certifications"

// ─── Education card (reusable for UnB + CNA) ─────────────────────────────────

interface EducationCardProps {
    imageUrl: string;
    imageAlt: string;
    badgeLabel: string;
    badgeColor: string;
    children: React.ReactNode;
    variants?: object;
}

const EducationCard = memo(function EducationCard({
                                                      imageUrl,
                                                      imageAlt,
                                                      children,
                                                      variants,
                                                  }: EducationCardProps) {
    return (
        <motion.div
            variants={variants}
            whileHover={{x: 4}}
            transition={{duration: 0.15}}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:border-primary/40 hover:shadow-lg transition-all"
        >
            <div className="relative h-28 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent"
                />
            </div>
            <div className="p-7">{children}</div>
        </motion.div>
    );
});

// ─── Cert card ────────────────────────────────────────────────────────────────

interface CertCardProps {
    title: string;
    issuer: string;
    year: string;
    credential: string;
    variants?: object;
}

const CertCard = memo(function CertCard({
                                            title,
                                            issuer,
                                            year,
                                            credential,
                                            variants,
                                        }: CertCardProps) {
    return (
        <motion.div
            variants={variants}
            whileHover={{x: 4}}
            transition={{duration: 0.15}}
            className="rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all shadow-sm"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h4 className="font-semibold text-sm mb-1 leading-snug">{title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{issuer}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-mono font-medium text-foreground">{year}</span>
                    <a
                        href={credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        aria-label={`View credential for ${title}`}
                    >
                        <ExternalLink className="h-3 w-3" aria-hidden="true"/>
                    </a>
                </div>
            </div>
        </motion.div>
    );
});

// ─── Section ──────────────────────────────────────────────────────────────────

interface EducationSectionProps {
    tr: Translations;
}

export default function EducationSection({tr}: EducationSectionProps) {
    const reduced = useReducedMotion();
    const headerV = pick(reduced, fadeUp, fadeUpReduced);
    const cardV = pick(reduced, fadeUpChild, fadeUpChildReduced);

    return (
        <section
            id="education"
            aria-label={tr.education.title}
            className="py-28 px-6 lg:px-12 bg-secondary/40 border-y border-border"
        >
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="relative mb-14"
                    variants={headerV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, margin: "-60px"}}
                >
                    <SectionIndex num="03"/>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                        {tr.education.title}
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Left — Formação + Idiomas */}
                    <motion.div
                        className="flex flex-col gap-8"
                        variants={staggerParent(0.15)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true, margin: "-40px"}}
                    >
                        {/* Education */}
                        <div>
                            <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                {tr.education.education_label}
                            </p>
                            <EducationCard
                                imageUrl={unbImage}
                                imageAlt="Campus universitário da UnB"
                                variants={cardV}
                            >
                                <h3 className="text-2xl font-black mb-2">{tr.education.degree}</h3>
                                <p className="text-muted-foreground mb-1">{tr.education.university}</p>
                                <p className="text-sm font-mono text-muted-foreground/70 mb-7">
                                    {tr.education.period}
                                </p>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-3">
                                    {tr.education.areas_label}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {tr.education.areas.map((area) => (
                                        <span
                                            key={area}
                                            className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium"
                                        >
                      {area}
                    </span>
                                    ))}
                                </div>
                            </EducationCard>
                        </div>

                        {/* Languages */}
                        <div>
                            <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                {tr.education.idiomas_label}
                            </p>
                            <EducationCard
                                imageUrl={cnaImage}
                                imageAlt="Aprendizado de inglês"
                                variants={cardV}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-base mb-1">CNA — Inglês</h3>
                                        <p className="text-sm text-muted-foreground">Centro de Línguas CNA</p>
                                        <p className="text-xs text-muted-foreground/70 mt-0.5">
                                            {tr.education.cna_meta}
                                        </p>
                                    </div>
                                    <span
                                        className="inline-block rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-mono font-semibold text-primary shrink-0">
                    Advanced 1
                  </span>
                                </div>
                            </EducationCard>
                        </div>
                    </motion.div>

                    {/* Right — Certifications */}
                    <motion.div
                        variants={staggerParent(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true, margin: "-40px"}}
                    >
                        <motion.p
                            variants={cardV}
                            className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
                        >
                            {tr.education.certs_label}
                        </motion.p>

                        <div className="space-y-4">
                            {CERTS.map((cert) => (
                                <CertCard key={cert.title} {...cert} variants={cardV}/>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
