// src/app/[locale]/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@seller/components/theme/themeProvider";
import Footer from "@seller/components/footer";
import Header from "@seller/components/homepage/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muuza Seller Portal – Grow Your Online Business Effortlessly",
  description:
    "Muuza helps sellers create stores, manage products, track sales, and scale their business effortlessly with powerful tools built for African merchants.",
  keywords: [
    "Muuza",
    "seller portal",
    "ecommerce platform",
    "online store",
    "African sellers",
    "business tools",
    "product management",
    "sales analytics",
  ],
  openGraph: {
    title: "Muuza Seller Portal – Smart Tools for Modern Sellers",
    description:
      "Sell more with Muuza. Manage your business, track performance, and launch your online store in minutes.",
    url: "https://muuza.co.tz",
    siteName: "Muuza",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muuza Seller Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muuza Seller Portal",
    description:
      "A powerful platform designed to help African sellers grow and manage their business.",
    images: ["/og-image.jpg"],
  },
};


// Modify the component signature to expect a Promise for params
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Await params to satisfy the async type requirement

  const messages = await getMessages({ locale });

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
