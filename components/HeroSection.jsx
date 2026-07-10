export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-bl from-blue-700 via-blue-600 to-indigo-800 text-white rounded-2xl mb-10 px-8 py-16 md:py-24">
      {/* decorative circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />

      <div className="relative z-10 max-w-xl">
        <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
          🛍️ فروشگاه آنلاین
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
          بهترین محصولات،
          <br />
          بهترین قیمت
        </h1>
        <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-sm">
          از پوشاک تا الکترونیک — همه چیز در یک جا، با ارسال سریع و ضمانت
          بازگشت کالا.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/products"
            className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
          >
            مشاهده همه محصولات
          </a>
          <a
            href="/cart"
            className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            سبد خرید
          </a>
        </div>
      </div>

      {/* stats row */}
      <div className="relative z-10 mt-12 flex flex-wrap gap-8 text-sm text-blue-100">
        <div>
          <span className="block text-2xl font-bold text-white">+۵۰۰</span>
          محصول
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">+۱۲۰۰</span>
          مشتری راضی
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">۷ روز</span>
          ضمانت بازگشت
        </div>
      </div>
    </section>
  );
}