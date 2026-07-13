"use client";

import React from "react";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group glassmorphism-card rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 relative hover:-translate-y-1.5 hover:border-primary-hover hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)]">
      <Link href={`/products/${product.id}`} className="w-full aspect-square relative overflow-hidden bg-slate-950 block">
        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs border border-white/10 text-text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
          {product.category}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="mb-3.5">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-base font-bold text-text-primary mb-1.5 line-clamp-2 cursor-pointer transition-all duration-300 hover:text-primary-hover">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-extrabold text-primary-hover">${product.price.toFixed(2)}</span>
          <button
            className="bg-white/5 border border-white/10 text-text-primary w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:border-transparent hover:text-white hover:scale-110 hover:shadow-[0_4px_12px_rgba(139,92,246,0.25)]"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
