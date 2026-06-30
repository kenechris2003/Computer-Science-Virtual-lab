import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Virtual Lab - Nigerian Computer Science Students",
    template: "%s | Virtual Lab",
  },
  description:
    "An online practical learning platform for 100 & 200 level Nigerian Computer Science students. Write code, execute programs, practice SQL, learn Linux commands, and build web pages directly from your browser.",
  keywords: [
    "virtual lab",
    "computer science",
    "Nigeria",
    "programming",
    "SQL",
    "Linux",
    "web development",
    "education",
    "e-learning",
  ],
  authors: [{ name: "Virtual Lab Team" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://virtuallab.edu.ng",
    siteName: "Virtual Lab Nigeria",
    title: "Virtual Lab - Nigerian Computer Science Students",
    description:
      "Online practical learning platform for Nigerian Computer Science students",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                borderRadius: "0.75rem",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}