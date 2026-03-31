import type { Metadata } from "next";

import { AppShell } from "@/src/components/layout/app-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "English Detective Practice",
  description: "英語ロープレ授業の課題用MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
