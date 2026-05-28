import yaml from "js-yaml";
import projectsRaw from "@/data/projects.yaml?raw";
import experiencesRaw from "@/data/experiences.yaml?raw";
import certsRaw from "@/data/certifications.yaml?raw";
import type {AppData} from "@/types";

export const rawData: AppData = {
    projects: (yaml.load(projectsRaw) as { projects: AppData["projects"] }).projects,
    experiences: (yaml.load(experiencesRaw) as { experiences: AppData["experiences"] }).experiences,
    certs: (yaml.load(certsRaw) as { certs: AppData["certs"] }).certs,
};