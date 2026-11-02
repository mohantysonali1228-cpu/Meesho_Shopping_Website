
export const products = [
  { id: 1, name: "Women Printed Straight Kurta", category: "Women Ethnic", price: 399, old: 899, rating: 4.2, reviews: 1240, tag: "Bestseller", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRskMMlAMYtE9SmJyvCGUeFuaqV7qPZPY3RBXUwUy6axXHd94kYCQe8SFKgFEPnxSgPZNjGeVvGAtrx6RSpr-2nByilDT3wGmI1A018vbN_SWp_4f_s62aTmh0" },
  { id: 2, name: "Elegant Floral Printed Saree", category: "Women Ethnic", price: 599, old: 1299, rating: 4.1, reviews: 842, tag: "Trending", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700" },
  { id: 3, name: "Casual Men's Cotton Shirt", category: "Men", price: 449, old: 999, rating: 4.0, reviews: 523, tag: "New", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700" },
  { id: 4, name: "Stylish Women's Handbag", category: "Accessories", price: 349, old: 799, rating: 4.3, reviews: 2110, tag: "Bestseller", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700" },
  { id: 5, name: "Minimal Gold-Plated Earrings", category: "Jewellery", price: 199, old: 499, rating: 4.1, reviews: 678, tag: "Trending", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700" },
  { id: 6, name: "Women's Casual Sneakers", category: "Footwear", price: 499, old: 1199, rating: 4.0, reviews: 387, tag: "Popular", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700" },
  { id: 7, name: "Home Decorative Cushion Set", category: "Home & Kitchen", price: 299, old: 699, rating: 4.4, reviews: 930, tag: "Deal", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=700" },
  { id: 8, name: "Classic Analog Wrist Watch", category: "Accessories", price: 549, old: 1499, rating: 4.2, reviews: 1200, tag: "Bestseller", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700" },
  { id: 9, name: "Premium Women's Top", category: "Women Western", price: 279, old: 649, rating: 4.0, reviews: 318, tag: "New", img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=700" },
  { id: 10, name: "Kids Casual Outfit Set", category: "Kids", price: 399, old: 899, rating: 4.3, reviews: 254, tag: "Popular", img: "https://m.media-amazon.com/images/I/51m5jCCvrgL._AC_SL320_QL70_.jpg" },
  { id: 11, name: "Wireless Bluetooth Earbuds", category: "Electronics", price: 699, old: 1999, rating: 3.9, reviews: 1740, tag: "Deal", img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700" },
  { id: 12, name: "Kitchen Storage Organizer", category: "Home & Kitchen", price: 249, old: 599, rating: 4.2, reviews: 489, tag: "Trending", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700" }
];

export const categories = [
  "Women Ethnic",
  "Women Western",
  "Men",
  "Kids",
  "Home & Kitchen",
  "Beauty",
  "Jewellery",
  "Footwear",
  "Accessories",
  "Electronics"
];

export const money = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;
