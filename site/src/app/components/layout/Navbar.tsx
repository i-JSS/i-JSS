import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import {Github, Globe, Linkedin, Menu, Moon, Sun, X} from "lucide-react";
import type {Translations} from "@/lib/i18n";
import {LANG_LABELS} from "@/lib/i18n";
import {scrollToSection} from "@/lib/scroll";
import type {Lang, Theme} from "@/types";

interface NavbarProps {
    theme: Theme;
    toggleTheme: () => void;
    lang: Lang;
    changeLang: (l: Lang) => void;
    tr: Translations;
    translating: boolean;
}

const LANGS: Lang[] = ["pt", "en", "es"];

export default function Navbar({
                                   theme,
                                   toggleTheme,
                                   lang,
                                   changeLang,
                                   tr,
                                   translating,
                               }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        {label: tr.nav.about, href: "#sobre"},
        {label: tr.nav.projects, href: "#projects"},
        {label: tr.nav.experience, href: "#experience"},
        {label: tr.nav.education, href: "#education"},
    ];

    const handleNav = (href: string) => {
        setMobileOpen(false);
        scrollToSection(href);
    };

    return (
        <nav
            role="navigation"
            aria-label="Primary navigation"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="flex h-16 items-center justify-between gap-8">
                    <a
                        href="#sobre"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNav("#sobre");
                        }}
                        className="font-black text-sm tracking-widest uppercase shrink-0 font-mono focus-visible:outline-primary"
                        aria-label="João Ginuino — go to top"
                    >
                        JG
                    </a>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center gap-8 flex-1 list-none" role="list">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNav(link.href);
                                    }}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-1.5">
                        <a
                            href="https://github.com/joaoginuino"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-secondary hover:border-primary/30 transition-all"
                            aria-label="GitHub profile"
                        >
                            <Github className="h-4 w-4" aria-hidden="true"/>
                        </a>

                        <a
                            href="https://linkedin.com/in/joaoginuino"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-secondary hover:border-primary/30 transition-all"
                            aria-label="LinkedIn profile"
                        >
                            <Linkedin className="h-4 w-4" aria-hidden="true"/>
                        </a>

                        <button
                            onClick={toggleTheme}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-secondary hover:border-primary/30 transition-all"
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" aria-hidden="true"/>
                            ) : (
                                <Moon className="h-4 w-4" aria-hidden="true"/>
                            )}
                        </button>

                        {/* Language dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen((o) => !o)}
                                aria-expanded={langOpen}
                                aria-haspopup="listbox"
                                aria-label={`Language: ${LANG_LABELS[lang]}`}
                                className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 hover:bg-secondary hover:border-primary/30 transition-all text-xs font-mono font-bold tracking-wider"
                            >
                                {translating ? (
                                    <span
                                        className="h-3.5 w-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin"
                                        aria-label="Translating…"
                                    />
                                ) : (
                                    <Globe className="h-3.5 w-3.5" aria-hidden="true"/>
                                )}
                                {LANG_LABELS[lang]}
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.ul
                                        role="listbox"
                                        aria-label="Select language"
                                        initial={{opacity: 0, y: -6, scale: 0.95}}
                                        animate={{opacity: 1, y: 0, scale: 1}}
                                        exit={{opacity: 0, y: -6, scale: 0.95}}
                                        transition={{duration: 0.15}}
                                        className="absolute right-0 top-11 z-50 rounded-lg border border-border bg-card shadow-xl overflow-hidden min-w-[72px] list-none"
                                    >
                                        {LANGS.map((l) => (
                                            <li key={l} role="option" aria-selected={lang === l}>
                                                <button
                                                    onClick={() => {
                                                        changeLang(l);
                                                        setLangOpen(false);
                                                    }}
                                                    className={`block w-full px-4 py-2.5 text-left text-xs font-mono font-bold tracking-wider transition-colors hover:bg-muted ${
                                                        lang === l ? "text-primary" : "text-foreground"
                                                    }`}
                                                >
                                                    {LANG_LABELS[l]}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-expanded={mobileOpen}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-secondary transition-all"
                        >
                            {mobileOpen ? (
                                <X className="h-4 w-4" aria-hidden="true"/>
                            ) : (
                                <Menu className="h-4 w-4" aria-hidden="true"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
                    >
                        <nav aria-label="Mobile navigation">
                            <ul className="mx-auto max-w-7xl px-6 py-4 flex flex-col list-none">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNav(link.href);
                                            }}
                                            className="block py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border last:border-0 tracking-wide"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
