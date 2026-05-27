import {useCallback, useEffect, useMemo, useState} from "react";
import type {Project, ProjectFilter} from "@/types";

const parseHours = (d: string) => parseFloat(d.replace(/[^0-9.]/g, ""));

export function useProjects(projects: Project[]) {
    const [filter, setFilter] = useState<ProjectFilter>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
        const sorted = [...projects].sort((a, b) => parseHours(b.duration) - parseHours(a.duration));
        return sorted[0] ?? null;
    });

    const filteredProjects = useMemo(() => {
        const list = filter === "all"
            ? projects
            : projects.filter((p) => p.category === filter);
        return [...list].sort((a, b) => parseHours(b.duration) - parseHours(a.duration));
    }, [filter, projects]);

    // Keep selectedProject in sync: update to translated version or reset to first
    useEffect(() => {
        if (!selectedProject) {
            setSelectedProject(filteredProjects[0] ?? null);
            return;
        }
        const match = filteredProjects.find((p) => p.id === selectedProject.id);
        if (!match) {
            setSelectedProject(filteredProjects[0] ?? null);
        } else if (match !== selectedProject) {
            setSelectedProject(match);
        }
    }, [filteredProjects]); // eslint-disable-line react-hooks/exhaustive-deps

    const selectProject = useCallback((p: Project) => setSelectedProject(p), []);
    const changeFilter = useCallback((f: ProjectFilter) => setFilter(f), []);

    return {filter, changeFilter, filteredProjects, selectedProject, selectProject};
}