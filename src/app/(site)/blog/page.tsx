import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FinalCta } from "@/components/marketing/final-cta";
import { Badge, Reveal } from "@/components/ui/primitives";
import { blogPosts } from "@/lib/data";
import { Glow } from "@/components/ui/glow";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articole despre recenzii, reputație online și comportamentul clienților în afaceri locale din România.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Ce am învățat din
            <br />
            <span className="display italic text-gold-300">214.000 de scanări.</span>
          </>
        }
        description="Scriem despre ce funcționează în practică — nu despre teorii de marketing. Date din rețeaua Recenziata, ghiduri operaționale și explicații despre politicile Google."
      />

      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          {/* Articol principal */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-ivory-300 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_32px_70px_-34px_rgba(8,8,10,0.3)] lg:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-950 lg:aspect-auto">
                <div className="bg-grid absolute inset-0 opacity-60" />
                <Glow className="-inset-8" opacity={0.55} />
                <div className="absolute inset-0 flex items-end p-7">
                  <p className="display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.05] text-ivory-100/90 italic">
                    4,2 → 4,6
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <Badge tone="gold">{featured.category}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-300">
                    <Clock className="size-3" strokeWidth={2} />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="tight mt-5 text-[22px] leading-snug font-medium text-ink-950 sm:text-[27px]">
                  {featured.title}
                </h2>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink-400">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-ivory-200 pt-5">
                  <span className="text-[12.5px] text-ink-300">{featured.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-950">
                    Citește
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Restul */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ivory-300 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_28px_60px_-30px_rgba(8,8,10,0.28)]"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone="muted">{post.category}</Badge>
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-300">
                      <Clock className="size-3" strokeWidth={2} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="tight mt-4 text-[17px] leading-snug font-medium text-ink-950">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-ivory-200 pt-4">
                    <span className="text-[12px] text-ink-300">{post.date}</span>
                    <ArrowUpRight className="size-3.5 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-950" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-ivory-300 bg-white p-7 text-center sm:p-10">
              <h2 className="tight text-[20px] font-medium text-ink-950 sm:text-[24px]">
                Un e-mail pe lună, cu ce contează
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-400">
                Date din rețea, schimbări în politicile Google și lucruri testate
                în restaurante reale. Fără promoții.
              </p>
              <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="adresa@afacerea-ta.ro"
                  aria-label="Adresa de e-mail"
                  className="h-12 flex-1 rounded-full border border-ivory-400 bg-ivory-50 px-5 text-[14px] text-ink-900 placeholder:text-ink-300 focus:border-ink-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 rounded-full bg-ink-950 px-6 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-ink-800"
                >
                  Abonează-mă
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
