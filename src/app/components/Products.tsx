'use client';
import { useState, useEffect } from "react";
import Cart from "./cart";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => 
      (activeCategory === "All" || product.category.includes(activeCategory.toLowerCase())) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div>
      <Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
        {/* Categories */}
        <div className="flex flex-row gap-4 font-semibold cursor-pointer tracking-wide">
          {["All", "Men", "Women", "Accessories", "Appliances", "Sale"].map((category) => (
            <div
              key={category}
              className={`py-2 px-4 rounded-md ${
                activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Price Sorting */}
        <select
          className="p-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>

        {/* Price Range Filter */}
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Price Range:</label>
          <input
            type="number"
            className="p-1 border rounded-md w-16"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            className="p-1 border rounded-md w-16"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            min={0}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="p-4 rounded-md flex flex-col shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="font-semibold text-sm mt-2">{product.title}</h2>
            <p className="font-semibold text-sm">${product.price}</p>
            <div className="flex flex-row justify-center mt-auto gap-4">
              <button
                className="bg-gray-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-700"
                onClick={() => setSelectedProduct(product)}
              >
                View More
              </button>
              <button
                className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-700"
                onClick={() => addToCart(product)}
              >
                Add Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl shadow-lg flex flex-col relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
              onClick={() => setSelectedProduct(null)}
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="md:w-1/2 flex items-center justify-center">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-64 h-64 object-cover rounded-lg" />
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-4">
                <h2 className="text-2xl font-semibold">{selectedProduct.title}</h2>
                <p className="text-lg font-bold text-blue-500 mt-2">${selectedProduct.price}</p>
                <p className="text-gray-600 mt-4">{selectedProduct.description}</p>

                <div className="mt-4">
                  <span className="font-semibold">Category:</span> {selectedProduct.category}
                </div>
                <div className="mt-2 flex items-center">
                  <span className="font-semibold">Rating:</span>
                  <span className="ml-2 text-yellow-500">⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</span>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    onClick={() => addToCart(selectedProduct)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
