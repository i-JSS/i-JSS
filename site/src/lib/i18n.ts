import type {Lang} from "@/types";

const i18n = {
    pt: {
        nav: {
            about: "Sobre",
            projects: "Projetos",
            experience: "Experiências",
            education: "Formação",
        },
        hero: {
            subtitle: "Engenheiro de Software · Universidade de Brasília",
            cta_projects: "Ver Projetos",
            cta_experience: "Experiências",
            metrics: {
                projects: "Projetos",
                experiences: "Experiências",
                teaching: "Semestres como Monitor",
                titles: "Títulos RoboCup",
            },
        },
        projects: {
            title: "Projetos",
            subtitle: "Trabalhos acadêmicos, competições, pessoais e profissionais.",
            filters: {
                all: "Todos",
                academic: "Acadêmico",
                competition: "Competição",
                personal: "Pessoal",
                professional: "Profissional",
            },
            stack: "Stack Tecnológico",
            duration: "Duração",
            role: "Papel",
            learnings: "Aprendizados",
        },
        experience: {
            title: "Experiências",
            subtitle: "Pesquisa aplicada, liderança técnica, consultoria e ensino.",
            technologies: "Tecnologias",
            achievements: "Conquistas",
            present: "Presente",
            current: "Atual",
        },
        education: {
            title: "Formação & Certificações",
            education_label: "Formação",
            idiomas_label: "Idiomas",
            certs_label: "Certificações",
            degree: "Engenharia de Software",
            university: "Universidade de Brasília",
            period: "2022 — Presente",
            areas_label: "Áreas relevantes:",
            areas: [
                "Sistemas Embarcados",
                "Arquitetura de Software",
                "Engenharia de Requisitos",
                "Robótica",
            ],
            cna_meta: "Em andamento",
        },
        footer: {
            role: "Engenheiro de Software",
            location: "Brasília, Brasil",
            rights: "© 2025 João Ginuino",
        },
    },
    en: {
        nav: {
            about: "About",
            projects: "Projects",
            experience: "Experience",
            education: "Education",
        },
        hero: {
            subtitle: "Software Engineer · University of Brasília",
            cta_projects: "View Projects",
            cta_experience: "Experience",
            metrics: {
                projects: "Projects",
                experiences: "Experiences",
                teaching: "Tutoring Semesters",
                titles: "RoboCup Titles",
            },
        },
        projects: {
            title: "Projects",
            subtitle: "Selected academic, competition, personal and professional work.",
            filters: {
                all: "All",
                academic: "Academic",
                competition: "Competition",
                personal: "Personal",
                professional: "Professional",
            },
            stack: "Tech Stack",
            duration: "Duration",
            role: "Role",
            learnings: "Key Learnings",
        },
        experience: {
            title: "Experience",
            subtitle: "Applied research, technical leadership, consulting and teaching.",
            technologies: "Technologies",
            achievements: "Achievements",
            present: "Present",
            current: "Current",
        },
        education: {
            title: "Education & Certifications",
            education_label: "Education",
            idiomas_label: "Languages",
            certs_label: "Certifications",
            degree: "Software Engineering",
            university: "University of Brasília",
            period: "2022 — Present",
            areas_label: "Relevant areas:",
            areas: [
                "Embedded Systems",
                "Software Architecture",
                "Requirements Engineering",
                "Robotics",
            ],
            cna_meta: "In progress",
        },
        footer: {
            role: "Software Engineer",
            location: "Brasília, Brazil",
            rights: "© 2025 João Ginuino",
        },
    },
    es: {
        nav: {
            about: "Sobre",
            projects: "Proyectos",
            experience: "Experiencias",
            education: "Formación",
        },
        hero: {
            subtitle: "Ingeniero de Software · Universidad de Brasilia",
            cta_projects: "Ver Proyectos",
            cta_experience: "Experiencias",
            metrics: {
                projects: "Proyectos",
                experiences: "Experiencias",
                teaching: "Semestres como Monitor",
                titles: "Títulos RoboCup",
            },
        },
        projects: {
            title: "Proyectos",
            subtitle: "Trabajos académicos, competencias, personales y profesionales.",
            filters: {
                all: "Todos",
                academic: "Académico",
                competition: "Competencia",
                personal: "Personal",
                professional: "Profesional",
            },
            stack: "Stack Tecnológico",
            duration: "Duración",
            role: "Rol",
            learnings: "Aprendizajes",
        },
        experience: {
            title: "Experiencias",
            subtitle: "Investigación aplicada, liderazgo técnico, consultoría y docencia.",
            technologies: "Tecnologías",
            achievements: "Logros",
            present: "Presente",
            current: "Actual",
        },
        education: {
            title: "Formación & Certificaciones",
            education_label: "Formación",
            idiomas_label: "Idiomas",
            certs_label: "Certificaciones",
            degree: "Ingeniería de Software",
            university: "Universidad de Brasilia",
            period: "2022 — Presente",
            areas_label: "Áreas relevantes:",
            areas: [
                "Sistemas Embebidos",
                "Arquitectura de Software",
                "Ingeniería de Requisitos",
                "Robótica",
            ],
            cna_meta: "En curso",
        },
        footer: {
            role: "Ingeniero de Software",
            location: "Brasilia, Brasil",
            rights: "© 2025 João Ginuino",
        },
    },
} as const;

export type Translations = typeof i18n.pt;

export const LANG_LABELS: Record<Lang, string> = {pt: "PT", en: "EN", es: "ES"};

export default i18n;
