import "./globals.css";
import {
  inter,
  playfairDisplay,
  dmSans,
  satisfy,
  spaceGrotesk,
  michroma,
} from "../fonts";
import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomScroll } from "@/components/CustomScroll";

export const metadata: Metadata = {
  title: "Thiago Trotta",
  description:
    "Portfolio website of Thiago Trotta, a software developer specializing in full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${dmSans.variable} ${satisfy.variable} ${spaceGrotesk.variable} ${michroma.variable}`}
    >
      <body className={"bg-background font-body text-texting antialiased"}>
        <CustomScroll />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
