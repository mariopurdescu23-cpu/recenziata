import { logos } from "@/lib/data";

export function LogoMarquee() {
  const list = [...logos, ...logos];
  return (
    <section
      aria-label="Afaceri care folosesc Recenziata"
      className="relative border-y border-white/[0.06] bg-ink-950 py-7"
    >
      <p className="mb-6 text-center text-[12px] tracking-[0.14em] text-ink-400 uppercase">
        Folosit zilnic de afaceri din România
      </p>
      <div className="mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14 pr-14">
          {list.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="tight text-[17px] whitespace-nowrap text-ink-300/70 transition-colors sm:text-[19px]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
