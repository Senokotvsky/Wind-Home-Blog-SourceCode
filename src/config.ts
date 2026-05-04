export const SITE = {
  website: "https://wind-home.pages.dev", // replace this with your deployed domain
  author: "Asano.P",
  profile: "https://yousef8.github.io/astro-paper-i18n",
  ogImage: "og-v3.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    url: "https://github.com/yousef8/astro-paper-i18n/edit/main/",
  },
  dynamicOgImage: true,
  lang: "zh", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
