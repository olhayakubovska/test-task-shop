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
      <div className="relative mx-auto grid gap-6 px-4 pt-14 pb-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Image src="/logo.svg" alt="World of Heels" width={155} height={48} />

          <p className="max-w-92 text-sm text-grey-text font-montserrat mt-1.5 leading-4">
            WOH — це синергія високих технологій та професійної майстерності. Ми перетворюємо
            складну конструкцію на легкість вашого танцю.
          </p>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <Link
                key={label}
                href="#"
                className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-[rgba(255, 255, 255, 1)] text-dark-main border border-[rgba(13,13,13,0.08)] active:text-pink-main"
                aria-label={label}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center">
          <div>
            <h3 className="mb-4 font-montserrat font-bold text-xs  tracking-[2px] uppercase text-grey-text">
              Каталог
            </h3>
            <ul className="flex flex-col gap-2 justify-center items-center text-[15px] font-medium">
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
            <h3 className="mb-4 font-montserrat font-bold text-xs leading-2  text-center tracking-[2px] uppercase text-grey-text">
              Компанія
            </h3>
            <ul className="flex flex-col gap-2 justify-center items-center text-[15px] font-medium">
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

          <div className="relative">
            <h3 className="relative z-10 mb-4 font-montserrat  leading-2 font-bold text-xs text-center tracking-[2px] uppercase text-grey-text">
              Зв&apos;язок
            </h3>
            <ul className="relative z-10 flex flex-col gap-2 justify-center items-center text-[15px] font-medium">
              <li>woh_support@gmail.com</li>
              <li>+38 (067) 967 01 63</li>
              <li>
                <Link href="#" className="font-semibold text-pink-main">
                  Замовити дзвінок →
                </Link>
              </li>
            </ul>
            <Image
              src="/footer-heels.svg"
              alt=""
              aria-hidden
              width={420}
              height={110}
              className="pointer-events-none absolute left-1/2 bottom-1 z-0 t  max-w-none -translate-x-1/2 select-none opacity-20"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex  flex-col items-center gap-6 border-t border-border px-4 py-6 text-center text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <span className="text-[#64748B] font-golos font-semibold text-[12px] leading-[100%] tracking-[1px] uppercase">
          © 2026 Structure Lab. Всі права захищені
        </span>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-4 text-[#0D0D0D] ">
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
