import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm antialiased text-zinc-900 bg-[#E5E8EC] min-h-screen`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
