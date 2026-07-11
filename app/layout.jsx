import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "ShopNext | Online Store",
  description: "Shop the best products with the best prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}