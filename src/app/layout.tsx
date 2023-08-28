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
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <nav className="flex flex-row justify-between pb-6 font-bold text-xl">
      <NavButton href="/" label="Home" />
      <NavButton href="/students" label="View Students" />
      <NavButton href="/leaderboards" label="Leaderboards" />
      <NavButton href="/import" label="Import Data" />
    </nav>
  );
}

function NavButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-blue-500">
      {label}
    </Link>
  );
}
