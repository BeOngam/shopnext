// app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}