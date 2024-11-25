import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/store/Provider";

export const metadata: Metadata = {
  title: "Oloja | Admin",
  description: "Admin portal for Oloja marketplace application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-satoshi">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
