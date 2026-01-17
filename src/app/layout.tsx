import type React from "react";
import type { Metadata } from "next";
import { Amiri, Tajawal } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/providers/query-provider";
import { DEFAULT_METADATA } from "@/lib/seo-config";
import "./globals.css";

export const metadata: Metadata = DEFAULT_METADATA;

const tajwal = Tajawal({
  variable: "--font-tajwal",
  weight: ["400", "500", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajwal.variable} ${amiri.variable}`}
    >
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
