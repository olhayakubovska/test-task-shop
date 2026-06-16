"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { FacebookIcon, InstagramIcon, TelegramIcon, TikTokIcon } from "@/shared/ui/icons";

const CATALOG_LINKS = ["High Heels", "Одяг", "Образи", "Костюми", "Шорти", "Аксесуари"];
const COMPANY_LINKS = [
  "Каталог товарів",
  "Про нас",
  "Співпраця",
  "Оплата і Доставка",
  "Гарантії і повернення",
  "Контакти",
];
const SOCIAL_LINKS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Telegram", Icon: TelegramIcon },
  { label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  const [activeLink, setActiveLink] = useState(CATALOG_LINKS[0]);

  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-375 grid gap-6 px-4 pt-14 pb-5 md:px-6 md:gap-8 3xl:gap-25 3xl:grid-cols-[395px_200_200_200] 3xl:px-0 3xl:pt-20 3xl:pb-11.25">
        <div className="flex flex-col items-center gap-6 text-center  md:gap-4 3xl:items-start 3xl:text-left 3xl:mt-2">
          <Image src="/logo.svg" alt="World of Heels" width={155} height={48} />

          <p className="max-w-92 text-sm text-grey-text font-montserrat mt-1.5 leading-4 md:max-w-133.5 md:h-15 md:text-base md:leading-5 3xl:mt-0">
            WOH — це синергія високих технологій та професійної майстерності. Ми перетворюємо
            складну конструкцію на легкість вашого танцю.
          </p>

          <div className="flex gap-4 3xl:mt-8">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <Link
                key={label}
                href="#"
                className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-[rgba(255,255,255,1)] text-dark-main border border-[rgba(13,13,13,0.08)] transition-all duration-300 hover:bg-pink-main hover:text-white hover:border-pink-main hover:-translate-y-2 hover:-rotate-12"
                aria-label={label}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start 3xl:contents 3xl:mt-4.25">
          <div>
            <h3 className="mb-4 font-montserrat font-bold text-xs tracking-[2px] uppercase text-grey-text text-center md:text-left 3xl:mb-6">
              Каталог
            </h3>
            <ul className="flex flex-col gap-2 items-center md:items-start text-[15px] font-medium md:leading-5 md:px-4 md:gap-4">
              {CATALOG_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={cn("hover:text-pink-main", activeLink === link && "text-pink-main")}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-montserrat font-bold text-xs leading-2 tracking-[2px] uppercase text-grey-text text-center md:text-left  3xl:mb-6">
              Компанія
            </h3>
            <ul className="flex flex-col gap-2 items-center md:items-start text-[15px] font-medium md:leading-5 md:px-4 md:gap-4 ">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={cn("hover:text-pink-main", activeLink === link && "text-pink-main")}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <h3 className="mb-4 font-montserrat leading-2 font-bold text-xs tracking-[2px] uppercase text-grey-text text-center md:text-left 3xl:mb-6">
              Зв&apos;язок
            </h3>
            <ul className="flex flex-col gap-2 items-center md:items-start text-[15px] font-medium md:leading-5 md:px-4 md:gap-4">
              <li>woh_support@gmail.com</li>
              <li>+38 (067) 967 01 63</li>
              <li>
                <Link href="#" className="font-semibold text-pink-main">
                  Замовити дзвінок →
                </Link>
              </li>
            </ul>
          </div>
          <div className="pointer-events-none absolute left-1/2 bottom-1 z-0 -translate-x-1/2 select-none opacity-20 flex gap-0 md:left-0 md:translate-x-0 md:w-full md:-mx-6">
            <Image src="/footer-heels.svg" alt="" aria-hidden width={420} height={110} className="w-1/2 h-auto" />
            <Image src="/footer-heels.svg" alt="" aria-hidden width={420} height={110} className="w-1/2 h-auto" />
          </div>
        </div>
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen border-t border-border 3xl:block hidden"></div>
      <div className="relative mx-auto max-w-375 flex flex-col items-center gap-6 border-t border-border px-4 py-6 text-center text-xs text-text-muted sm:px-6 3xl:border-t-0 3xl:flex-row 3xl:items-center 3xl:justify-between 3xl:text-left 3xl:px-8">
        <span className="text-[#64748B] font-golos font-semibold text-[12px] leading-[100%] tracking-[1px] uppercase">
          © 2026 Structure Lab. Всі права захищені
        </span>
        <div className="flex flex-col items-center gap-6 3xl:flex-row 3xl:gap-4 text-[#0D0D0D]">
          <Link
            href="#"
            className="font-golos font-medium text-xs tracking-[1px] text-center uppercase"
          >
            Публічна оферта
          </Link>
          <Link
            href="#"
            className="font-golos font-medium text-xs tracking-[1px] text-center uppercase"
          >
            Політика конфіденційності
          </Link>
          <Link
            href="#"
            className="font-golos font-medium text-xs tracking-[1px] text-center uppercase"
          >
            Розробка та підтримка сайту: KeyKey
          </Link>
        </div>
      </div>
    </footer>
  );
}
