/** Motion variants for scroll-triggered entrance animations. */

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};

export const slideLeftChild = {
  hidden: { opacity: 0, x: -44 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const slideLeftChildReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export const fadeUpChild = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeUpChildReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export const staggerParent = (stagger = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
});

/** Pick the full or simplified variant based on reduced-motion preference. */
export function pick<T>(reduced: boolean | null | undefined, full: T, simple: T): T {
  return reduced ? simple : full;
}
