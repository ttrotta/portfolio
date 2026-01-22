import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="en">
      <body className={"antialiased"}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
