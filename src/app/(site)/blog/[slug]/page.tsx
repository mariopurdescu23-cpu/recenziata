import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { Badge, Reveal } from "@/components/ui/primitives";
import { Glow } from "@/components/ui/glow";
import { blogPosts } from "@/lib/data";
import { initials } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    inLanguage: "ro-RO",
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Recenziata.ro" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <Glow
          className="-top-48 left-1/2 h-[32rem] w-[58rem] -translate-x-1/2"
          tone="goldSoft"
          opacity={0.7}
        />

        <div className="relative mx-auto max-w-[44rem] px-5 sm:px-7">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-300 transition-colors hover:text-ivory-100"
          >
            <ArrowLeft className="size-3.5" />
            Toate articolele
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="gold">{post.category}</Badge>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-300">
              <Clock className="size-3" strokeWidth={2} />
              {post.readTime}
            </span>
            <span className="text-[12.5px] text-ink-400">{post.date}</span>
          </div>

          <h1 className="tighter mt-5 text-[clamp(1.9rem,5vw,3rem)] leading-[1.06] font-medium text-ivory-100">
            {post.title}
          </h1>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-200">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-white/[0.07] pt-6">
            <span className="grid size-9 place-items-center rounded-full bg-white/[0.07] text-[11.5px] font-medium text-ivory-100 ring-1 ring-white/10 ring-inset">
              {initials(post.author)}
            </span>
            <div>
              <p className="text-[13.5px] font-medium text-ivory-100">
                {post.author}
              </p>
              <p className="text-[12px] text-ink-400">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </header>

      <article className="bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-[44rem] px-5 sm:px-7">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="tight mt-12 mb-4 text-[21px] leading-snug font-medium text-ink-950 first:mt-0 sm:text-[24px]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-2 border-gold-400 pl-6"
                >
                  <p className="display text-[clamp(1.15rem,2.4vw,1.5rem)] leading-[1.45] text-ink-800 italic">
                    {block.text}
                  </p>
                </blockquote>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="my-6 space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3.5">
                        <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-gold-500" />
                        <span className="text-[16px] leading-relaxed text-ink-600">
                          {item}
                        </span>
                      </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mb-5 text-[16px] leading-[1.75] text-ink-600">
                {block.text}
              </p>
            );
          })}

          <div className="mt-14 rounded-2xl border border-ivory-300 bg-white p-6 sm:p-8">
            <p className="eyebrow text-gold-600">Din practică</p>
            <p className="tight mt-3 text-[18px] leading-snug font-medium text-ink-950">
              Vrei să vezi cum arată fluxul despre care scriem?
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
              Demonstrația durează 30 de secunde și nu cere niciun cont.
            </p>
            <Link
              href="/maison-noir"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink-950 px-5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-ink-800"
            >
              Deschide fluxul
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-ivory-300 bg-ivory-200 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <h2 className="tight text-[20px] font-medium text-ink-950 sm:text-[24px]">
            Continuă cu
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ivory-300 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_28px_60px_-30px_rgba(8,8,10,0.28)]"
                >
                  <Badge tone="muted" className="self-start">
                    {p.category}
                  </Badge>
                  <h3 className="tight mt-4 text-[16.5px] leading-snug font-medium text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-400">
                    {p.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-500 transition-colors group-hover:text-ink-950">
                    Citește
                    <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
