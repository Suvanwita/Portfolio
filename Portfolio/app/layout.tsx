import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Suvanwita Das | Futuristic Portfolio",
    template: "%s | Suvanwita Das",
  },
  description:
    "The responsive portfolio of Suvanwita Das, showcasing modern frontend craft, product-minded engineering, and polished digital experiences.",
  keywords: [
    "Suvanwita Das",
    "portfolio",
    "frontend developer",
    "Next.js",
    "TypeScript",
    "UI engineer",
  ],
  authors: [{ name: "Suvanwita Das" }],
  creator: "Suvanwita Das",
  openGraph: {
    title: "Suvanwita Das | Futuristic Portfolio",
    description:
      "A dark futuristic portfolio for Suvanwita Das, built with Next.js, TypeScript, Tailwind CSS, and motion.",
    type: "website",
    locale: "en_US",
    siteName: "Suvanwita Das Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suvanwita Das | Futuristic Portfolio",
    description:
      "Modern frontend work, interactive UI systems, and product-focused digital craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10, 14, 30, 0.92)",
              border: "1px solid rgba(129, 140, 248, 0.35)",
              color: "#f8fbff",
            },
          }}
        />
      </body>
    </html>
  );
}
