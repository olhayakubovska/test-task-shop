import Link from "next/link";

const CATALOG_LINKS = ["High Heels", "Одяг", "Образи", "Костюми", "Шорти", "Аксесуари"];
const COMPANY_LINKS = ["Каталог товарів", "Про нас", "Співпраця", "Оплата і Доставка", "Гарантії і повернення", "Контакти"];
const SOCIAL_LINKS = ["Instagram", "Facebook", "Telegram", "TikTok"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-black italic text-accent">WOH</span>
          <p className="max-w-xs text-sm text-text-muted">
            WOH — це синергія високих технологій та професійної майстерності. Ми перетворюємо
            складну конструкцію на легкість вашого танцю.
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <span
                key={social}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-bold"
                aria-label={social}
              >
                {social[0]}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-text-muted">Каталог</h3>
          <ul className="space-y-2 text-sm">
            {CATALOG_LINKS.map((link, index) => (
              <li key={link}>
                <Link href="#" className={index === 0 ? "text-accent" : "hover:text-accent"}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-text-muted">Компанія</h3>
          <ul className="space-y-2 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" className="hover:text-accent">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-text-muted">Зв&apos;язок</h3>
          <ul className="space-y-2 text-sm">
            <li>woh_support@gmail.com</li>
            <li>+38 (067) 967 01 63</li>
            <li>
              <Link href="#" className="font-semibold text-accent">
                Замовити дзвінок →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-2 border-t border-border px-4 py-4 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>© 2026 World of Heels. Всі права захищені</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-accent">Публічна оферта</Link>
          <Link href="#" className="hover:text-accent">Політика конфіденційності</Link>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-0 hidden w-full select-none text-center text-[10rem] font-black uppercase tracking-tight text-bg-muted lg:block"
      >
        HEELS
      </span>
    </footer>
  );
}
