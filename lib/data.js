export const products = [
  {
    id: 1,
    name: "Walking shoes",
    price: 3500000,
    category: "Apparel",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill/cld-sample-5.jpg",
    description: "Comfortable and high-quality walking shoes",
    rating: 4.5,
    stock: 10,
  },
  {
    id: 2,
    name: "Sport Shoes",
    price: 8900000,
    category: "Footwear",
    imageUrl: "https://res.cloudinary.com/dy29yaa7h/image/upload/v1784237645/8fe985776c88398c350597af8ed36701093a94b0_1780131228_bfnvyv.webp",
    description: "Lightweight and durable shoes",
    rating: 4.2,
    stock: 5,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 25000000,
    category: "Electronics",
    imageUrl: "https://res.cloudinary.com/dy29yaa7h/image/upload/v1784240146/3771808270d5e2ff4e3b14836eb6c88947fb63c6_1760878223_g4xom9.webp",
    description: "Smart watch with full features",
    rating: 4.8,
    stock: 3,
  },
];

export const categories = ["All", "Apparel", "Footwear", "Electronics"];

export function getProductById(id) {
  const productId = Number(id);
  return products.find((product) => product.id === productId) || null;
}

export function getProductsByCategory(category) {
  if (!category || category === "All") return products;
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(productId, limit = 3) {
  return products.filter((product) => product.id !== Number(productId)).slice(0, limit);
}
