import type React from "react";
import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";

export const metadata: Metadata = {
  title: {
    template: "%s | سنيوريتا - معرض السيدات",
    default: "سنيوريتا - معرض السيدات",
  },
  description:
    "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياج، حقائب يد، ومجوهرات",
};

export default function MainSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
