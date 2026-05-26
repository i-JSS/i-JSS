import { Suspense, lazy } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/hooks/useLang";
import { useTranslation } from "@/hooks/useTranslation";
import { useProjects } from "@/hooks/useProjects";
import i18n from "@/lib/i18n";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import Footer from "./components/layout/Footer";

// Lazy-load below-the-fold sections for faster initial paint
const ProjectsSection = lazy(
  () => import("./components/sections/ProjectsSection")
);
const ExperienceSection = lazy(
  () => import("./components/sections/ExperienceSection")
);
const EducationSection = lazy(
  () => import("./components/sections/EducationSection")
);

function SectionSkeleton() {
  return (
    <div
      className="py-28 bg-background"
      aria-hidden="true"
      role="status"
      aria-label="Loading section…"
    />
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang } = useLang();
  const { data, translating } = useTranslation(lang);
  const { filter, changeFilter, filteredProjects, selectedProject, selectProject } =
    useProjects(data.projects);

  const tr = i18n[lang];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <style>{`
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        ::selection { background: rgba(61,142,255,0.25); }
      `}</style>

      {/* Skip to content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        changeLang={changeLang}
        tr={tr}
        translating={translating}
      />

      <main id="main-content">
        <HeroSection
          tr={tr}
          totalProjects={data.projects.length}
          totalExperiences={data.experiences.length}
        />

        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection
            filter={filter}
            changeFilter={changeFilter}
            filteredProjects={filteredProjects}
            selectedProject={selectedProject}
            selectProject={selectProject}
            tr={tr}
          />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceSection experiences={data.experiences} tr={tr} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EducationSection tr={tr} />
        </Suspense>
      </main>

      <Footer tr={tr} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
