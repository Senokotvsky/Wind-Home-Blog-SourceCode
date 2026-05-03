import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconMail from "@/assets/icons/IconMail.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconQQ from "@/assets/icons/IconQQ.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import { translateFor } from "@/i18n/utils";
import type { Props } from "astro";

type Translator = ReturnType<typeof translateFor>;

interface Social {
  name: string;
  href: string;
  linkTitle: (t: Translator) => string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "Github",
    href: "https://github.com/yousef8/astro-paper-i18n",
    linkTitle: (t: Translator) => t("socials.github"),
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/username",
    linkTitle: (t: Translator) => t("socials.x"),
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/username/",
    linkTitle: (t: Translator) => t("socials.linkedin"),
    icon: IconLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: (t: Translator) => t("socials.mail"),
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "X" }),
    icon: IconBrandX,
  },
  {
    name: "QQ",
    href: "https://connect.qq.com/widget/shareqq/index.html?url=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "QQ" }),
    icon: IconQQ,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: (t: Translator) => t("sharePost.via", { media: "Mail" }),
    icon: IconMail,
  },
] as const;
