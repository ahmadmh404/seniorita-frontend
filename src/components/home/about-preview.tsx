import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square lg:aspect-4/5 rounded-2xl overflow-hidden">
            <Image
              src="/images/about-section.png"
              alt="صنعت بعناية"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-right">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              صُنعت بعناية فائقة
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              في سنيوريتا، نؤمن بأن الأناقة ليست مجرد مظهر، بل هي تعبير عن
              الذات. نختار بعناية كل قطعة من مجموعاتنا لنقدم لكِ أفضل ما في عالم
              الإكسسوارات والجمال.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              منذ تأسيسنا، حرصنا على تقديم منتجات تجمع بين الجودة العالية
              والتصميم الأنيق، لتكون رفيقتك في كل مناسبة وتضيف لمسة من التميز
              لإطلالتك اليومية.
            </p>
            <Link href="/about">
              <Button className="btn-primary text-lg">اكتشفي قصتنا</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
