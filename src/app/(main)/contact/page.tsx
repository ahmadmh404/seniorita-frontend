import { ContactForm } from "@/components/contact/contact-form";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata = {
  title: "اتصل بنا | سنيوريتا - معرض السيدات",
  description:
    "اتصل بنا للإجابة على جميع استفساراتك - هاتف، بريد إلكتروني، رسالة مباشرة",
  keywords: [
    "اتصل بنا",
    "قصتنا",
    "سنيوريتا",
    "معرض السيدات",
    "إكسسوارات",
    "خدمة العملاء",
  ],
  openGraph: {
    type: "website",
    title: "اتصل بنا | سنيوريتا - معرض السيدات",
    description: "تعرفي على قصة سنيوريتا ومنتجاتنا الفاخرة",
    url: `${SITE_URL}/about`,
    siteName: "سنيوريتا",
    locale: "ar_SY",
  },
  twitter: {
    card: "summary_large_image",
    title: "اتصل بنا | سنيوريتا",
    description: "تعرفي على قصة سنيوريتا والخدمات المتميزة",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
