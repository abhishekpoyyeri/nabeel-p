import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Ahamed Nabeel — Med-Tech Explorer",
  description:
    "Biomedical enthusiast and student admission consultant with a passion for learning and exploring health technology.",
  openGraph: {
    title: "Ahamed Nabeel — Med-Tech Explorer",
    description:
      "A biomedical enthusiast and student admission consultant exploring health technology — research-driven, fast-learning, growth-minded.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
