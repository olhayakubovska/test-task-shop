import Image from "next/image";
import Link from "next/link";
import { CartIcon, MenuIcon, SearchIcon, UserIcon } from "@/shared/ui/icons";
import { IconButton } from "@/shared/ui/IconButton";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "#", label: "Колекції" },
  { href: "#", label: "Знижки" },
  { href: "#", label: "Про нас" },
  { href: "#", label: "Співпраця" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-375 items-center justify-between gap-6 px-4.75 py-3">
        <Link href="/catalog" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="World of Heels"
            width={128}
            height={40}
            className="h-9.75 w-32"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-pink-main">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <IconButton aria-label="Пошук">
            <SearchIcon />
          </IconButton>

          <IconButton aria-label="Особистий кабінет" className="hidden md:flex">
            <UserIcon />
          </IconButton>

          <div className="relative">
            <IconButton aria-label="Кошик">
              <CartIcon />
            </IconButton>
            <span className="absolute -right-2 -top-2 flex h-4 w-5.5 items-center justify-center rounded-full bg-pink-main text-[8px] font-bold text-black">
              10
            </span>
          </div>

          <IconButton aria-label="Меню" className="lg:hidden">
            <MenuIcon />
          </IconButton>
          <span className="hidden pl-2 text-sm font-semibold lg:block">UA</span>
        </div>
      </div>
    </header>
  );
}
