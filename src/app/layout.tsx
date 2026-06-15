import type { Metadata } from "next";
import { Golos_Text, Montserrat } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "WOH | Каталог взуття",
  description: "World of Heels — каталог професійного танцювального взуття",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${golosText.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
