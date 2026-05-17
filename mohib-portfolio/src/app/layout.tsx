import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mohib ur Rehman | Frontend Engineer",
  description:
    "Frontend-focused Full-Stack Developer specializing in cinematic web, mobile, and real-time digital experiences.",
  metadataBase: new URL("https://mohib-portfolio.vercel.app"),
  openGraph: {
    title: "Mohib ur Rehman | Frontend Engineer",
    description:
      "Frontend-focused Full-Stack Developer specializing in cinematic web, mobile, and real-time digital experiences.",
    type: "website",
    url: "https://mohib-portfolio.vercel.app",
    images: [
      {
        url: "https://mohib-portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohib Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohib ur Rehman | Frontend Engineer",
    description:
      "Frontend-focused Full-Stack Developer specializing in cinematic web, mobile, and real-time digital experiences.",
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
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
     <body className="min-h-screen bg-[#050816] text-[#708993] antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
