import Image from "next/image";
import Link from "next/link";
import { CartIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/shared/ui/icons";
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
      <div className="mx-auto flex max-w-375 items-center justify-between gap-6 px-4.75 py-3 md:px-6 md:py-3.5 3xl:px-0">
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

        <nav className="font-montserrat hidden items-center gap-10 text-[13px] font-medium uppercase  leading-[100%] tracking-[1.5px] 3xl:flex">
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
          <IconButton aria-label="Особистий кабінет" className="hidden md:flex">
            <HeartIcon />
          </IconButton>

          <div className="relative">
            <IconButton aria-label="Кошик">
              <CartIcon />
            </IconButton>
            <span className="absolute -right-2 -top-2 flex h-4 w-5.5 items-center justify-center rounded-full bg-pink-main text-[8px] font-bold text-black">
              10
            </span>
          </div>

          <IconButton aria-label="Меню" className="3xl:hidden">
            <MenuIcon />
          </IconButton>



          <span className="font-montserrat hidden items-center gap-10 text-[13px] font-medium uppercase leading-[100%] tracking-[1.5px] border-l-[0.5px] border-[#0D0D0D] h-6 pl-[16.5px] 3xl:flex">
            UA
          </span>
        </div>
      </div>
    </header>
  );
}
