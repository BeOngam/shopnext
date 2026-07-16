import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-black text-white">
      <div className="relative overflow-hidden" style={{ minHeight: "620px" }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/shoe shoping.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-screen-xl flex-col justify-center px-6 py-24 lg:px-8">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm">
            New 2025 Collection
          </div>

          <h1
            className="mb-6 max-w-3xl font-black uppercase leading-[0.9]"
            style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.02em" }}
          >
            Sense of satisfaction,
            <br />
            <span className="text-white/90">A better life!</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-200">
            From footwear to modern tech products — enjoy the best shopping experience on our website.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#fff", color: "#000", border: "2px solid #fff" }}
            >
              Shop now
            </Link>
            <Link
              href="/products?cat=Electronics"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "transparent" }}
            >
              Electronics
            </Link>
          </div>
        </div>
      </div>

      <div className="grid border-b border-black bg-white text-black md:grid-cols-3" style={{ borderTop: "none" }}>
        {[
          { label: "Apparel", sub: "Hoodies, tees and more", href: "/products?cat=Apparel", bg: "#f5f5f5" },
          { label: "Footwear", sub: "Sport, running", href: "/products?cat=Footwear", bg: "#e8e8e8" },
          { label: "Electronics", sub: "Smart watches and accessories", href: "/products?cat=Electronics", bg: "#000", color: "#fff" },
        ].map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="hero-category-card group relative flex min-h-[220px] flex-col justify-end overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
            style={{ background: cat.bg, color: cat.color || "#000" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-current transition-transform duration-700 group-hover:translate-x-full" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full translate-x-full bg-current opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100" />
            <div className="absolute right-0 top-0 h-full w-[2px] translate-y-[-100%] bg-current opacity-0 transition-transform duration-700 group-hover:translate-y-0 group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] translate-y-full bg-current opacity-0 transition-transform duration-700 group-hover:translate-y-0 group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] opacity-70">{cat.sub}</p>
              <p className="text-2xl font-black uppercase">{cat.label}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase">
                <span>Shop</span>
                <span className="rounded-full border border-current/20 px-2 py-1 text-[11px] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}