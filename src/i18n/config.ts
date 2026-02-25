import type { I18nStrings } from "./types";
import ENLocale from "./locales/en";
import CNLocale from "./locales/zh";

export type LocaleProfile = {
  name: string;
  messages: I18nStrings;
  langTag: string;
  direction: "rtl" | "ltr" | "auto";
  googleFontName: string;
  default?: boolean;
};

export type LocaleKey = keyof typeof localeToProfile;

export const localeToProfile = {
  zh: {
    name: "中文",
    messages: CNLocale,
    langTag: "zh-CN",
    direction: "ltr",
    googleFontName: "Noto+Sans+SC",
    default: true,
  },
  en: {
    name: "English",
    messages: ENLocale,
    langTag: "en-US",
    direction: "ltr",
    googleFontName: "IBM+Plex+Mono",
  },
} satisfies Record<string, LocaleProfile>;

export const SUPPORTED_LOCALES = Object.keys(localeToProfile) as LocaleKey[];

export const DEFAULT_LOCALE =
  SUPPORTED_LOCALES.find(
    key => (localeToProfile[key] as LocaleProfile)?.default === true
  ) ?? SUPPORTED_LOCALES[0];

export const LOCALES_TO_LANG = Object.fromEntries(
  // For Sitemap
  Object.entries(localeToProfile).map(([locale, profile]) => [
    locale,
    profile.langTag,
  ])
) as Record<keyof typeof localeToProfile, string>;

/**
 * Whether to filter posts by language in posts pages.
 * When set to true (default), only posts in the current language are shown.
 * When set to false, all posts in all languages are shown regardless of current language.
 */
export const FILTER_POSTS_BY_LANGUAGE = false;
