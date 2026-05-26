export function scrollToSection(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({behavior: "smooth"});
}
