# ShopNext

یک فروشگاه آنلاین ساده ساخته‌شده با Next.js، Prisma و Cloudinary.

## امکانات

- صفحه‌ی اصلی با بخش معرفی محصول
- صفحه‌ی محصولات با جستجو و فیلتر دسته‌بندی
- سبد خرید با Zustand
- صفحه‌ی ثبت سفارش
- آپلود تصویر با Cloudinary
- API سفارش‌گذاری با Prisma

## تکنولوژی‌های استفاده‌شده

- Next.js 16
- React 19
- Prisma
- Tailwind CSS
- Zustand
- Cloudinary

## راه‌اندازی محلی

1. وابستگی‌ها را نصب کنید:

```bash
npm install
```

2. متغیرهای محیطی لازم را تنظیم کنید:

```bash
cp .env.example .env
```

3. دیتابیس Prisma را آماده کنید:

```bash
npx prisma generate
npx prisma migrate deploy
```

4. سرور توسعه را اجرا کنید:

```bash
npm run dev
```

سپس در مرورگر به آدرس زیر بروید:

```text
http://localhost:3000
```

## متغیرهای محیطی

این پروژه به متغیرهای زیر نیاز دارد:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## دیپلوی روی Vercel

1. پروژه را روی GitHub push کنید.
2. در Vercel روی «Add New Project» بزنید.
3. ریپو را انتخاب کنید.
4. در بخش Environment Variables این مقادیر را اضافه کنید:
   - DATABASE_URL
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
5. Build Command را روی این تنظیم کنید:

```bash
npm run build
```

6. Deploy را انجام دهید.

> برای کارکرد درست Prisma در Vercel، بهتر است دیتابیس PostgreSQL آماده داشته باشید و متغیر DATABASE_URL را در محیط Vercel تنظیم کنید.

## اسکریپت‌های مفید

```bash
npm run dev
npm run build
npm run start
npm run lint
```
