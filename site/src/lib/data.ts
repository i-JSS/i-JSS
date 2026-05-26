import yaml from "js-yaml";
// @ts-ignore — Vite ?raw imports are typed via vite/client
import projectsRaw from "@/data/projects.yaml?raw";
// @ts-ignore
import experiencesRaw from "@/data/experiences.yaml?raw";
import type {AppData} from "@/types";

export const rawData: AppData = {
    projects: (yaml.load(projectsRaw) as { projects: AppData["projects"] }).projects,
    experiences: (yaml.load(experiencesRaw) as { experiences: AppData["experiences"] }).experiences,
};
