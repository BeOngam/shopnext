export default function HeroSection() {
  return (
    <section>
      {/* Full-bleed hero */}
      <div className="relative bg-black text-white overflow-hidden" style={{minHeight: "520px"}}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px"}} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-24 flex flex-col justify-center" style={{minHeight: "520px"}}>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            New 2025 Collection
          </p>
          <h1 className="font-black uppercase leading-none mb-6"
            style={{fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.02em"}}>
            Latest<br />
            <span className="text-white">Products</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-md leading-relaxed">
            From apparel to electronics — fresh style, better performance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/products" className="adidas-btn-primary" style={{background:"#fff", color:"#000", border:"2px solid #fff"}}>
              Shop now
            </a>
            <a href="/products?cat=Electronics" className="adidas-btn-secondary" style={{background:"transparent", color:"#fff", border:"2px solid #fff"}}>
              Electronics
            </a>
          </div>
        </div>
      </div>

      {/* Category quick-links */}
      <div className="grid grid-cols-3 border-b border-black" style={{borderTop: "none"}}>
        {[
          { label: "Apparel", sub: "Hoodies, tees and more", href: "/products?cat=Apparel", bg: "#f5f5f5" },
          { label: "Footwear", sub: "Sport, running", href: "/products?cat=Footwear", bg: "#e8e8e8" },
          { label: "Electronics", sub: "Smart watches and accessories", href: "/products?cat=Electronics", bg: "#000", color: "#fff" },
        ].map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            className="group flex flex-col justify-end p-6 transition-opacity hover:opacity-80"
            style={{ background: cat.bg, color: cat.color || "#000", minHeight: "180px" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">{cat.sub}</p>
            <p className="text-2xl font-black uppercase">{cat.label}</p>
            <span className="text-sm font-bold uppercase mt-2 flex items-center gap-1">
              Shop ←
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}