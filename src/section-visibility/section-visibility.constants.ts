export const SECTION_KEYS = [
  "hero",
  "about",
  "experience",
  "education",
  "skills",
  "projects",
  "activities",
  "blog",
  "linkedin",
  "contact",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const DEFAULT_SECTIONS = Object.fromEntries(
  SECTION_KEYS.map((key) => [key, true]),
) as Record<SectionKey, boolean>;
