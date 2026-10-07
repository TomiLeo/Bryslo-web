import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryslo | Tvorba moderních webů na míru",
  description:
    "Tvorba moderních, rychlých a responzivních webových stránek na míru. Pomáháme firmám i jednotlivcům růst online a získávat zákazníky.",
  keywords: [
    "webdesign",
    "vývoj webu",
    "Next.js",
    "moderní weby",
    "Zlín",
    "Česko",
  ],
  openGraph: {
    title: "Bryslo | Tvorba moderních webů na míru",
    description:
      "Tvorba moderních, rychlých a responzivních webových stránek na míru. Pomáháme firmám i jednotlivcům růst online a získávat zákazníky.",
    url: "https://bryslo-web.vercel.app",
    siteName: "Bryslo",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryslo | Tvorba moderních webů na míru",
    description:
      "Tvorba moderních, rychlých a responzivních webových stránek na míru. Pomáháme firmám i jednotlivcům růst online a získávat zákazníky.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
