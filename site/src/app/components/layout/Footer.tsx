import {Github, Gitlab, Linkedin, Mail, MapPin, Moon, Sun} from "lucide-react";
import type {Theme} from "@/types";
import type {Translations} from "@/lib/i18n";

interface FooterProps {
    tr: Translations;
    theme: Theme;
    toggleTheme: () => void;
}

export default function Footer({tr, theme, toggleTheme}: FooterProps) {
    return (
        <footer
            className="relative bg-[#0d0d0d] border-t border-white/[0.06] pt-16 pb-10 px-6 lg:px-12 overflow-hidden">
            {/* Accent gradient line */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12 mb-14">
                    {/* Identity */}
                    <div>
                        <div className="font-black text-2xl tracking-tight text-white mb-3 font-mono">João Ginuino</div>
                        <p className="text-white/50 text-sm mb-1">{tr.footer.role}</p>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs">
                            <MapPin className="h-3 w-3" aria-hidden="true"/>
                            <span>{tr.footer.location}</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col justify-between gap-8 md:items-end">
                        <nav aria-label="Footer links">
                            <ul className="flex flex-wrap gap-3 list-none">
                                {[
                                    {
                                        href: "https://gitlab.com/i-JSS",
                                        icon: <Gitlab className="h-3.5 w-3.5" aria-hidden="true"/>,
                                        label: "GitLab",
                                        external: true,
                                    },
                                    {
                                        href: "https://github.com/i-JSS",
                                        icon: <Github className="h-3.5 w-3.5" aria-hidden="true"/>,
                                        label: "GitHub",
                                        external: true,
                                    },
                                    {
                                        href: "https://www.linkedin.com/in/i-jss/",
                                        icon: <Linkedin className="h-3.5 w-3.5" aria-hidden="true"/>,
                                        label: "LinkedIn",
                                        external: true,
                                    },
                                    {
                                        href: "mailto:js2snc@gmail.com",
                                        icon: <Mail className="h-3.5 w-3.5" aria-hidden="true"/>,
                                        label: "Email",
                                        external: false,
                                    },
                                ].map(({href, icon, label, external}) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
                                            aria-label={label}
                                        >
                                            {icon}
                                            {label}
                                        </a>
                                    </li>
                                ))}

                                <li>
                                    <button
                                        onClick={toggleTheme}
                                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
                                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                                    >
                                        {theme === "dark" ? (
                                            <Sun className="h-3.5 w-3.5" aria-hidden="true"/>
                                        ) : (
                                            <Moon className="h-3.5 w-3.5" aria-hidden="true"/>
                                        )}
                                        {theme === "dark" ? "Light" : "Dark"}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/30 font-mono">{tr.footer.rights}</p>
                    <p className="text-xs text-white/20 font-mono">
                        Software Engineering · UnB · Brasília
                    </p>
                </div>
            </div>
        </footer>
    );
}
