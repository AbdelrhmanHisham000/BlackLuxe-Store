import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../_components/Header";
import ReduxProvider from "../_redux/ReduxProvider";
import Cart from "../_components/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlackLuxe",
  description:
    "Discover premium black fashion and lifestyle products at BlackLuxe.",
  keywords: ["BlackLuxe", "Luxury", "Fashion", "Black Fashion", "Style"],
  authors: [{ name: "BlackLuxe Team", url: "https://blackluxe.com" }],
  creator: "BlackLuxe",
  metadataBase: new URL("https://blackluxe.com"),
  openGraph: {
    title: "BlackLuxe",
    description: "Premium black fashion and lifestyle products.",
    url: "https://blackluxe.com",
    siteName: "BlackLuxe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackLuxe",
    description: "Premium black fashion and lifestyle products.",
    creator: "@blackluxehq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#171717] text-white antialiased`}
      >
        <ReduxProvider>
          <header>
            <Header />
          </header>
          <Cart />

          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
