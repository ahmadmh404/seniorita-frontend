import type React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Suspense } from "react";
import { HeaderFallback } from "../fallbacks/header";
import { FooterFallback } from "../fallbacks/footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
