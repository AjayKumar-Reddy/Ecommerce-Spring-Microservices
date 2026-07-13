"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartOverlay from "@/components/CartOverlay";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const prodRes = await fetch("/api/products?size=8");
        if (!prodRes.ok) throw new Error("Failed to fetch products");
        const prodData = await prodRes.json();
        setProducts(prodData.content || []);

        const catRes = await fetch("/api/products/categories");
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }
      } catch (err: any) {
        console.error(err);
        setError("Could not connect to backend services. Please ensure they are running.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Icon selector based on category name
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "electronics":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      case "fashion":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <path d="M20.38 3.46L16 2.14l-4.38 1.32a2 2 0 0 0-1.38 1.9v2.18h8v-2.18a2 2 0 0 0-1.24-1.9zM10.24 7.54h3.52v12.22A2.24 2.24 0 0 1 11.52 22h-.24a2.24 2.24 0 0 1-2.24-2.24V7.54z"></path>
            <circle cx="12" cy="11" r="1.5"></circle>
          </svg>
        );
      case "home appliances":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="4" y1="10" x2="20" y2="10"></line>
            <circle cx="12" cy="6" r="2"></circle>
            <circle cx="12" cy="16" r="1"></circle>
          </svg>
        );
      case "books":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z"></path>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="12 8 8 12 12 16 16 12 12 8"></polygon>
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Category Bubbles Row (Amazon/Flipkart Style) */}
      {categories.length > 0 && (
        <div className="flex items-center justify-center gap-6 md:gap-16 py-6 overflow-x-auto border-b border-white/5 bg-slate-950/30 px-6">
          {categories.map((category) => (
            <Link href={`/products?category=${encodeURIComponent(category)}`} key={category} className="flex flex-col items-center gap-2 group shrink-0">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-600/10 group-hover:border-indigo-500/50 group-hover:scale-105 active:scale-95 shadow-md">
                {getCategoryIcon(category)}
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      )}


      {/* Featured Products Section */}
      <section id="featured" className="py-16 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Trending Products</h2>
            <p className="text-sm text-slate-400 mt-1.5">Top-selling items with highest user ratings.</p>
          </div>
          <Link href="/products" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 px-5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 active:scale-[0.98]">
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <div className="w-10 h-10 border-2 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading catalog...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-slate-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="mt-3 text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#010409] p-10 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AURA Retail Platform. Built for placements and portfolios.</p>
      </footer>
    </div>
  );
}
