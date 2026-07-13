"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartOverlay from "@/components/CartOverlay";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { addToCart } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQtyChange = (val: number) => {
    if (!product) return;
    setQuantity(Math.max(1, Math.min(val, product.stockQuantity)));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10 md:px-10">
        <Link href="/products" className="inline-flex items-center gap-2 text-text-secondary text-sm font-semibold mb-8 transition-all duration-300 hover:text-primary-hover">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Shop
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-text-secondary">Loading product details...</p>
          </div>
        ) : error || !product ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-text-secondary">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="mt-3 text-sm">
              {error || "Product not found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image */}
            <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden aspect-square relative shadow-premium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary-hover uppercase tracking-wider mb-3">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-text-primary mb-4">{product.name}</h1>
              <span className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">${product.price.toFixed(2)}</span>
              
              <div className="h-[1px] bg-white/10 mb-6" />

              <h2 className="text-sm font-bold mb-3 text-text-primary uppercase tracking-wider">Description</h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">{product.description}</p>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">Availability:</span>
                  {product.stockQuantity > 0 ? (
                    <span className="text-success font-bold">In Stock ({product.stockQuantity} available)</span>
                  ) : (
                    <span className="text-error font-bold">Out of Stock</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">Seller ID:</span>
                  <span>{product.sellerId || "Anonymous Seller"}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 mb-6" />

              {/* Actions */}
              <div className="flex gap-5 items-center">
                {product.stockQuantity > 0 && (
                  <div className="flex items-center border border-white/10 rounded-full bg-white/5 p-1">
                    <button 
                      className="bg-transparent border-none text-text-secondary w-9 h-9 rounded-full cursor-pointer flex items-center justify-center text-lg transition-all duration-300 hover:bg-white/10 hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed" 
                      onClick={() => handleQtyChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-base font-bold px-4 min-w-[30px] text-center">{quantity}</span>
                    <button 
                      className="bg-transparent border-none text-text-secondary w-9 h-9 rounded-full cursor-pointer flex items-center justify-center text-lg transition-all duration-300 hover:bg-white/10 hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed" 
                      onClick={() => handleQtyChange(quantity + 1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                )}
                <button
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-full text-base font-bold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] disabled:bg-white/10 disabled:text-text-muted disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2.5"
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity <= 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
