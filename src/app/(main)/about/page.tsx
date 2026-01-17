import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Shield, Truck } from "lucide-react";
import { StructuredData } from "@/components/seo/structured-data";
import { getWebPageSchema, getLocalBusinessSchema } from "@/lib/seo-config";
import { Suspense } from "react";
import { Stats } from "@/components/about/stats";
import { Features } from "@/components/about/features";
import { FeaturesFallback, StatsFallback } from "@/components/about/fallbacks";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://senorita.com";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرفي على قصة سنيوريتا - معرض السيدات للإكسسوارات الفاخرة والخدمة المتميزة",
  keywords: [
    "من نحن",
    "قصتنا",
    "سنيوريتا",
    "معرض السيدات",
    "إكسسوارات",
    "خدمة العملاء",
  ],
  openGraph: {
    type: "website",
    title: "من نحن | سنيوريتا - معرض السيدات",
    description: "تعرفي على قصة سنيوريتا ومنتجاتنا الفاخرة",
    url: `${SITE_URL}/about`,
    siteName: "سنيوريتا",
    locale: "ar_SY",
  },
  twitter: {
    card: "summary_large_image",
    title: "من نحن | سنيوريتا",
    description: "تعرفي على قصة سنيوريتا والخدمات المتميزة",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div>
      <StructuredData
        data={getWebPageSchema(
          "من نحن",
          metadata.description!,
          `${SITE_URL}/about`
        )}
      />

      <StructuredData data={getLocalBusinessSchema()} />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1400"
          alt="من نحن"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              قصتنا
            </h1>
            <p className="text-foreground/80 text-lg max-w-xl mx-auto px-4">
              رحلة شغف بالأناقة والجمال
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/about-page.png"
                alt="معرض سنيوريتا"
                fill
                className="object-cover"
              />
            </div>

            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                من نحن
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  بدأت قصة سنيوريتا من حلم بسيط - توفير إكسسوارات فاخرة وأنيقة
                  للمرأة العربية بأسعار منافسة. منذ تأسيسنا، كان هدفنا تمكين كل
                  امرأة من الحصول على قطع مميزة تعكس شخصيتها وذوقها الرفيع.
                </p>
                <p>
                  نفخر بتقديم مجموعة متنوعة من النظارات الشمسية الفاخرة،
                  مستحضرات التجميل عالية الجودة، الحقائب الأنيقة، والمجوهرات
                  الراقية. كل قطعة في معرضنا تم اختيارها بعناية لتلبي أعلى
                  معايير الجودة والأناقة.
                </p>
                <p>
                  نؤمن بأن الأناقة ليست ترفاً بل حق لكل امرأة، ولذلك نسعى جاهدين
                  لتقديم أفضل المنتجات بأسعار تناسب الجميع، مع الحفاظ على جودة
                  لا تُضاهى.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Suspense fallback={<StatsFallback />}>
        <Stats />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={<FeaturesFallback />}>
        <Features />
      </Suspense>

      {/* Vision Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            رؤيتنا
          </h2>
          <p className="text-background/80 text-lg leading-relaxed">
            أن نكون الوجهة الأولى للمرأة العربية في عالم الإكسسوارات والجمال،
            نقدم لها كل ما تحتاجه لتبرز أناقتها وتعبر عن شخصيتها الفريدة. نسعى
            لبناء مجتمع من النساء الواثقات اللواتي يفخرن بأناقتهن.
          </p>
        </div>
      </section>
    </div>
  );
}
