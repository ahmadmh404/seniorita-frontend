import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/api";
import { connection } from "next/server";
import { footerLinks, socialLinks } from "@/lib/constant";

export async function Footer() {
  const { data: categories } = await getCategories();

  await connection();

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12 py-16 lg:py-20">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/images/logo.png"
                alt="سنيوريتا"
                width={140}
                height={60}
                className="h-14 w-auto drop-shadow-sm hover:drop-shadow-lg transition-all"
                priority
              />
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md lg:max-w-sm">
              معرض سنيوريتا للسيدات - وجهتك المثالية للإكسسوارات الفاخرة
              والأنيقة. نقدم أرقى النظارات الشمسية، المكياج، الحقائب والمجوهرات
              بأفضل الأسعار.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  طرطوس، سوريا
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +963 999 123 456
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-muted hover:bg-primary hover:text-background transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-foreground tracking-tight">
              التصفح
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 flex items-center gap-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-foreground tracking-tight">
              الدعم
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 flex items-center gap-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 lg:col-span-1 xl:col-span-1">
            <div>
              <h4 className="font-semibold text-lg text-foreground tracking-tight mb-3">
                النشرة البريدية
              </h4>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                اشترك للحصول على آخر العروض والمنتجات الجديدة حصرياً
              </p>
              <form className="space-y-3" dir="ltr">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="h-12 text-base placeholder:text-muted-foreground/80"
                  dir="ltr"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base shadow-lg hover:shadow-xl"
                >
                  اشترك الآن
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 md:pb-12 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} سنيوريتا. جميع الحقوق محفوظة.</p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/categories"
              className="hover:text-foreground transition-colors"
            >
              الأقسام
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
