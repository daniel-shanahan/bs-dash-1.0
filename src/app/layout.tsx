import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainskills Dashboard",
  description: "Brainskills Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="px-24 py-6">
          <nav className="flex flex-row justify-between pb-6 font-bold text-xl">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/import" className="hover:text-blue-500">
              Import Data
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
