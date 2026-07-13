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
        // Fetch products (paginated response, we take the content list)
        const prodRes = await fetch("/api/products?size=8");
        if (!prodRes.ok) throw new Error("Failed to fetch products");
        const prodData = await prodRes.json();
        setProducts(prodData.content || []);

        // Fetch distinct categories
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
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      case "fashion":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.38 3.46L16 2.14l-4.38 1.32a2 2 0 0 0-1.38 1.9v2.18h8v-2.18a2 2 0 0 0-1.24-1.9zM10.24 7.54h3.52v12.22A2.24 2.24 0 0 1 11.52 22h-.24a2.24 2.24 0 0 1-2.24-2.24V7.54z"></path>
            <circle cx="12" cy="11" r="1.5"></circle>
          </svg>
        );
      case "home appliances":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="4" y1="10" x2="20" y2="10"></line>
            <circle cx="12" cy="6" r="2"></circle>
            <circle cx="12" cy="16" r="1"></circle>
          </svg>
        );
      case "books":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z"></path>
          </svg>
        );
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-10 md:py-24 flex flex-col md:flex-row items-center justify-between min-h-[480px] bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)] border-b border-white/10 overflow-hidden">
        <div className="max-w-[600px] z-10 text-center md:text-left">
          <span className="text-sm font-bold text-primary-hover uppercase tracking-[0.15em] mb-3 block">AI-Powered E-Commerce</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 bg-gradient-to-r from-white to-primary-hover bg-clip-text text-transparent">
            The Future of Shopping is Here.
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
            Discover Aura, a state-of-the-art enterprise e-commerce experience. Built on a robust Java Spring Boot microservice backend, optimized with caching, and crafted with a stunning, ultra-premium Tailwind UI.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="/products">
              <button className="bg-gradient-to-r from-primary to-secondary text-white py-3.5 px-7 rounded-full text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)]">
                Shop Collection
              </button>
            </Link>
            <a href="#featured">
              <button className="bg-white/3 border border-white/10 text-text-primary py-3.5 px-7 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-white/8 hover:border-primary">
                Explore Features
              </button>
            </a>
          </div>
        </div>
        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] z-5 mt-10 md:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/30 blur-[40px] rounded-full" />
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_40px_rgba(139,92,246,0.3)]">
            <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="rgba(15, 22, 36, 0.8)" stroke="url(#hero-grad)" strokeWidth="1.5" />
            <polygon points="50,25 75,40 75,70 50,85 25,70 25,40" fill="rgba(139, 92, 246, 0.05)" stroke="url(#hero-grad-sub)" strokeWidth="1" />
            <circle cx="50" cy="55" r="10" fill="url(#hero-grad)" opacity="0.8" />
            <defs>
              <linearGradient id="hero-grad" x1="15" y1="15" x2="85" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="0.5" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="hero-grad-sub" x1="25" y1="25" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-text-primary">Browse Categories</h2>
              <p className="text-sm text-text-secondary mt-1.5">Handpicked premium selections curated just for you.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-10">
            {categories.map((category) => (
              <Link href={`/products?category=${encodeURIComponent(category)}`} key={category}>
                <div className="glassmorphism-card rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:bg-primary/5">
                  <div className="mb-4 text-primary-hover flex justify-center">{getCategoryIcon(category)}</div>
                  <h3 className="text-sm font-bold text-text-primary">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section id="featured" className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-text-primary">Featured Products</h2>
            <p className="text-sm text-text-secondary mt-1.5">Explore our top trending products, engineered for excellence.</p>
          </div>
          <Link href="/products" className="bg-white/3 border border-white/10 text-text-primary py-2.5 px-6 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 hover:bg-white/8 hover:border-primary">
            View All Shop
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-text-secondary">Loading curated collection...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-text-secondary">
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
      <footer className="mt-auto border-t border-white/10 bg-[#03060a] p-10 text-center text-text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} AURA Inc. All rights reserved. Enterprise E-Commerce Platform.</p>
      </footer>
    </div>
  );
}
