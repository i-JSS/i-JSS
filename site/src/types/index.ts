export type ProjectCategory = "academic" | "competition" | "personal" | "professional";
export type ProjectFilter = "all" | ProjectCategory;
export type Lang = "pt" | "en" | "es";
export type Theme = "light" | "dark";

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    stack: string[];
    repository: string;
    start: string;
    end: string | null;
    learnings: string[];
    role: string;
    duration: string;
}

export interface Experience {
    title: string;
    company: string;
    institution: string;
    start: string;
    end: string | null;
    image: string;
    description: string;
    technologies: string[];
    achievements: string[];
    current: boolean;
}

export interface AppData {
    projects: Project[];
    experiences: Experience[];
}
