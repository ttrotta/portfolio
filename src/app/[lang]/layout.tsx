import "../globals.css";
import { inter, dmSans, michroma } from "../../lib/fonts";
import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomScroll } from "@/components/CustomScroll";
import Navbar from "@/components/ui/Navbar";

import { getDictionary } from "../../lib/dictionaries";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Thiago Trotta",
  description:
    "Portfolio website of Thiago Trotta, a software developer specializing in full-stack development.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "es");

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${dmSans.variable} ${michroma.variable}`}
    >
      <body className={"bg-background font-body text-texting antialiased"}>
        <Navbar lang={lang} dict={dict.navbar} />
        <CustomScroll />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
