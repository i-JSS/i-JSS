import React, {memo} from "react";
import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import {Github} from "lucide-react";
import {fadeUp, fadeUpReduced, pick, slideLeftChild, slideLeftChildReduced, staggerParent,} from "@/lib/animate";
import SectionIndex from "@/app/components/ui/SectionIndex";
import TechBadge from "@/app/components/ui/TechBadge";
// @ts-ignore
import projectsBg from "@/assets/unb.png";
import type {Project, ProjectFilter} from "@/types";
import type {Translations} from "@/lib/i18n";

// ─── Filter tabs ──────────────────────────────────────────────────────────────

interface ProjectFiltersProps {
    filter: ProjectFilter;
    changeFilter: (f: ProjectFilter) => void;
    labels: Translations["projects"]["filters"];
}

const FILTER_KEYS: ProjectFilter[] = [
    "all", "academic", "competition", "personal", "professional",
];

const ProjectFilters = memo(function ProjectFilters({
                                                        filter,
                                                        changeFilter,
                                                        labels,
                                                    }: ProjectFiltersProps) {
    return (
        <div
            role="group"
            aria-label="Filter projects by category"
            className="mb-6 flex flex-wrap gap-1 bg-muted/50 rounded-xl p-1 w-fit border border-border"
        >
            {FILTER_KEYS.map((f) => (
                <button
                    key={f}
                    onClick={() => changeFilter(f)}
                    aria-pressed={filter === f}
                    className={`relative px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        filter === f
                            ? "bg-card text-foreground shadow-sm border border-border"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {labels[f]}
                </button>
            ))}
        </div>
    );
});

// ─── Project list ─────────────────────────────────────────────────────────────

interface ProjectListProps {
    projects: Project[];
    selectedId: string | null;
    onSelect: (p: Project) => void;
    filterKey: ProjectFilter;
    categoryLabel: (cat: string) => string;
    reduced: boolean | null;
}

const ProjectList = memo(function ProjectList({
                                                  projects,
                                                  selectedId,
                                                  onSelect,
                                                  filterKey,
                                                  categoryLabel,
                                                  reduced,
                                              }: ProjectListProps) {
    const slide = pick(reduced, slideLeftChild, slideLeftChildReduced);

    return (
        <motion.ul
            key={filterKey}
            className="space-y-1 list-none"
            variants={staggerParent(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, margin: "-40px"}}
            aria-label="Projects"
        >
            {projects.map((project) => (
                <motion.li key={project.id} variants={slide}>
                    <button
                        className={`group w-full text-left cursor-pointer rounded-xl border px-6 py-4 transition-all duration-200 ${
                            selectedId === project.id
                                ? "border-primary bg-card shadow-md shadow-primary/5"
                                : "border-transparent hover:border-border hover:bg-card/60"
                        }`}
                        onMouseEnter={() => onSelect(project)}
                        onClick={() => onSelect(project)}
                        aria-pressed={selectedId === project.id}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div
                                    aria-hidden="true"
                                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                                        selectedId === project.id
                                            ? "bg-primary"
                                            : "bg-border group-hover:bg-muted-foreground"
                                    }`}
                                />
                                <div className="min-w-0">
                                    <p className="font-semibold text-sm truncate">{project.title}</p>
                                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                                        {categoryLabel(project.category)}
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono shrink-0">
                {project.duration}
              </span>
                        </div>
                    </button>
                </motion.li>
            ))}
        </motion.ul>
    );
});

// ─── Project preview ──────────────────────────────────────────────────────────

interface ProjectPreviewProps {
    project: Project;
    categoryLabel: string;
    tr: Translations["projects"];
    className?: string;
}

const projectImages = import.meta.glob("@/assets/projects/*", {
    eager: true,
    query: { format: 'webp', w: '600', quality: '75' },
    import: "default",
}) as Record<string, string>;

const ProjectPreview = memo(function ProjectPreview({
                                                        project,
                                                        categoryLabel,
                                                        tr,
                                                        className = "",
                                                    }: ProjectPreviewProps) {
    return (
        <motion.div
            key={project.id}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1] as const}}
            className={`rounded-2xl border border-border bg-card overflow-hidden shadow-lg ${className}`}
        >
            {/* Thumbnail */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={projectImages[`/src/assets/projects/${project.image}`] ?? projectsBg}
                    alt={`Visual for ${project.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"/>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span
              className="text-[10px] uppercase tracking-[0.15em] font-mono px-3 py-1 rounded-full bg-black/50 text-white backdrop-blur-md">
            {categoryLabel}
          </span>
                    {project.repository && (
                        <a
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-primary transition-colors"
                            aria-label={`Open ${project.title} on GitHub`}
                        >
                            <Github className="h-3.5 w-3.5" aria-hidden="true"/>
                        </a>
                    )}
                </div>
            </div>

            <div className="p-8">
                <h3 className="mb-3 text-2xl font-bold leading-tight">{project.title}</h3>
                <p className="mb-7 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                </p>

                {/* Stack */}
                <div className="mb-7">
                    <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                        {tr.stack}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <TechBadge key={tech} label={tech}/>
                        ))}
                    </div>
                </div>

                {/* Duration + Role */}
                <dl className="mb-7 grid grid-cols-2 gap-4 rounded-xl bg-muted/50 border border-border p-5">
                    <div>
                        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1.5">
                            {tr.duration}
                        </dt>
                        <dd className="font-bold font-mono">{project.duration}</dd>
                    </div>
                    <div>
                        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1.5">
                            {tr.role}
                        </dt>
                        <dd className="font-bold">{project.role}</dd>
                    </div>
                </dl>

                {/* Learnings */}
                <div>
                    <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                        {tr.learnings}
                    </p>
                    <ul className="space-y-2.5 list-none">
                        {project.learnings.map((learning, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                                <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">→</span>
                                {learning}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
});

// ─── Section ──────────────────────────────────────────────────────────────────

interface ProjectsSectionProps {
    filter: ProjectFilter;
    changeFilter: (f: ProjectFilter) => void;
    filteredProjects: Project[];
    selectedProject: Project | null;
    selectProject: (p: Project) => void;
    tr: Translations;
}

export default function ProjectsSection({
                                            filter,
                                            changeFilter,
                                            filteredProjects,
                                            selectedProject,
                                            selectProject,
                                            tr,
                                        }: ProjectsSectionProps) {
    const reduced = useReducedMotion();
    const headerV = pick(reduced, fadeUp, fadeUpReduced);

    const categoryLabels: Record<string, string> = {
        all: tr.projects.filters.all,
        academic: tr.projects.filters.academic,
        competition: tr.projects.filters.competition,
        personal: tr.projects.filters.personal,
        professional: tr.projects.filters.professional,
    };

    return (
        <section
            id="projects"
            aria-label={tr.projects.title}
            className="py-28 px-6 lg:px-12 bg-secondary/40 border-y border-border"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-8 items-start">

                    {/* Left - header + filters + list */}
                    <div className="min-w-0">
                        <motion.div
                            className="relative mb-8"
                            variants={headerV}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, margin: "-60px"}}
                        >
                            <SectionIndex num="01"/>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                                {tr.projects.title}
                            </h2>
                            <p className="mt-3 text-muted-foreground">{tr.projects.subtitle}</p>
                        </motion.div>

                        <motion.div
                            variants={headerV}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, margin: "-60px"}}
                        >
                            <ProjectFilters
                                filter={filter}
                                changeFilter={changeFilter}
                                labels={tr.projects.filters}
                            />
                        </motion.div>

                        <ProjectList
                            projects={[...filteredProjects].sort((a, b) => {
                                const parseHours = (d: string) => parseFloat(d.replace(/[^0-9.]/g, ""));
                                return parseHours(b.duration) - parseHours(a.duration);
                            })}
                            selectedId={selectedProject?.id ?? null}
                            onSelect={selectProject}
                            filterKey={filter}
                            categoryLabel={(cat) => categoryLabels[cat] ?? cat}
                            reduced={reduced}
                        />
                        <div className="h-0 lg:h-48" aria-hidden="true" />
                    </div>

                    {/* Right — sticky preview (desktop only) */}
                    {selectedProject && (
                        <div className="hidden lg:block sticky top-24">
                            <ProjectPreview
                                project={selectedProject}
                                categoryLabel={categoryLabels[selectedProject.category]}
                                tr={tr.projects}
                            />
                        </div>
                    )}
                </div>

                {/* Mobile preview — below list */}
                <AnimatePresence mode="wait">
                    {selectedProject && (
                        <ProjectPreview
                            key={`mobile-${selectedProject.id}`}
                            project={selectedProject}
                            categoryLabel={categoryLabels[selectedProject.category]}
                            tr={tr.projects}
                            className="lg:hidden mt-6"
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
