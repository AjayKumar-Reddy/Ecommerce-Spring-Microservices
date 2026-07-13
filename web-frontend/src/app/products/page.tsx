"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartOverlay from "@/components/CartOverlay";
import ProductCard from "@/components/ProductCard";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("asc");

  // Sync state if search params category changes
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    setActiveCategory(cat);
    setPage(0); // reset page on category change
  }, [searchParams]);

  // Fetch categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/products/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products when page, category, sort details change
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let url = `/api/products?page=${page}&size=9&sortBy=${sortBy}&direction=${direction}`;
        
        if (activeCategory !== "All") {
          url = `/api/products/category/${encodeURIComponent(activeCategory)}?page=${page}&size=9&sortBy=${sortBy}&direction=${direction}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.content || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory, page, sortBy, direction]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setPage(0);
    if (category === "All") {
      router.push("/products");
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const [field, dir] = val.split("-");
    setSortBy(field);
    setDirection(dir);
    setPage(0);
  };

  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-10 md:px-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar Filters */}
        <aside className="flex flex-col gap-8 self-start sticky top-[100px] hidden md:block">
          <div className="glassmorphism-card rounded-2xl p-6 border border-white/5">
            <h2 className="text-base font-bold text-white mb-5 border-b border-white/10 pb-2.5">Categories</h2>
            <ul className="list-none flex flex-col gap-2">
              <li
                className={`text-sm font-medium cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-white ${
                  activeCategory === "All"
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 rounded-l-none rounded-r-lg"
                    : "text-slate-400"
                }`}
                onClick={() => handleCategorySelect("All")}
              >
                All Products
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`text-sm font-medium cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-white ${
                    activeCategory === category
                      ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 rounded-l-none rounded-r-lg"
                      : "text-slate-400"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Catalog Content */}
        <main className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                {activeCategory === "All" ? "All Products" : activeCategory}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-slate-900 border border-white/10 text-slate-200 px-4 py-2 rounded-full outline-none text-sm cursor-pointer transition-all duration-300 focus:border-indigo-500" onChange={handleSortChange}>
                <option value="id-asc">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
              <div className="w-10 h-10 border-2 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Fetching products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-slate-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p className="mt-3 text-sm">
                No products found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <button
                    className="bg-[#020617] border border-white/10 text-white w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-indigo-500 hover:text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                    aria-label="Previous page"
                  >
                    &lt;
                  </button>
                  <span className="text-sm font-semibold text-slate-400">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    className="bg-[#020617] border border-white/10 text-white w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-indigo-500 hover:text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-10 h-10 border-2 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading Catalog...</p>
      </div>
    }>
      <ProductsCatalogContent />
    </Suspense>
  );
}
