# ShopNext

ShopNext is a modern, minimal e-commerce storefront built with Next.js, Prisma, and Cloudinary. It offers a polished shopping experience with product browsing, category filtering, cart management, and order placement.

## ✨ Highlights

- Beautiful landing experience with a hero section and featured products
- Product listing page with search and category filters
- Smooth cart workflow powered by Zustand
- Checkout flow for placing orders
- Image upload support via Cloudinary
- Server-side order API built with Prisma

## 🛠️ Tech Stack

- Next.js 16
- React 19
- Prisma
- Tailwind CSS
- Zustand
- Cloudinary

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env
```

Then add the required values:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Prepare Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Run the app locally

```bash
npm run dev
```

Open your browser at:

```text
http://localhost:3000
```

## ☁️ Deploy on Vercel

1. Push the project to GitHub.
2. Open Vercel and create a new project.
3. Import your repository.
4. Add the following environment variables in Vercel:
   - DATABASE_URL
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
5. Use this build command:

```bash
npm run build
```

6. Deploy the project.

> A PostgreSQL database is required for Prisma to work correctly in production.

## 📜 Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 💡 Project Vision

ShopNext was designed as a practical and elegant storefront example that combines modern frontend UX with a reliable backend flow for real-world e-commerce experiences.
