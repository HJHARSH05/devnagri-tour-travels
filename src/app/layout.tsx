import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Redirect from "@/components/shared/Redirect";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "Devnagri Tour And Travels",
  description: "Locally-owned travel specialists in Uttarakhand. We design safe, meaningful and flexible journeys — for pilgrims, trekkers and explorers.",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="0DSRjxJQJxbBOfK1Xm3SguABrAdWcrBtj9MqGx-zW9w" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1900px] mx-auto`}
      >
        <Redirect>
          <Navbar />
          {children}
          <Toaster />
          <Footer/>
        </Redirect>
      </body>
    </html>
  );
}
