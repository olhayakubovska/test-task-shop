import Link from "next/link";
import { CartIcon, SearchIcon, UserIcon } from "@/shared/ui/icons";
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/catalog" className="flex flex-col leading-none">
          <span className="text-2xl font-black italic text-accent">WOH</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-text-muted sm:block">
            World of Heels
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton aria-label="Пошук" className="hidden sm:flex">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="Особистий кабінет" className="hidden sm:flex">
            <UserIcon />
          </IconButton>
          <div className="relative">
            <IconButton aria-label="Кошик">
              <CartIcon />
            </IconButton>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              10
            </span>
          </div>
          <span className="hidden pl-2 text-sm font-semibold sm:block">UA</span>
        </div>
      </div>
    </header>
  );
}
