"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const { cart, cartTotal, updateCartQuantity, removeFromCart } = useApp();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button className="bg-transparent border-none text-text-secondary cursor-pointer p-1.5 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5 hover:text-text-primary" onClick={onClose} aria-label="Close panel">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary gap-4">
              <span className="text-text-muted">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </span>
              <p className="text-sm">Your shopping cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 pb-5 border-b border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-white/5 border border-white/10"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2">{item.product.name}</h3>
                    <span className="text-[11px] text-text-muted uppercase tracking-wider">{item.product.category}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-base font-bold text-primary-hover">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center border border-white/10 rounded-full bg-white/5 overflow-hidden">
                      <button
                        className="bg-transparent border-none text-text-secondary w-7 h-7 cursor-pointer flex items-center justify-center text-sm transition-all duration-300 hover:bg-white/10 hover:text-text-primary"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold px-2 min-w-5 text-center">{item.quantity}</span>
                      <button
                        className="bg-transparent border-none text-text-secondary w-7 h-7 cursor-pointer flex items-center justify-center text-sm transition-all duration-300 hover:bg-white/10 hover:text-text-primary"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-transparent border-none text-text-muted cursor-pointer transition-all duration-300 hover:text-error"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove item"
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-slate-950">
            <div className="flex justify-between mb-5">
              <span className="text-sm text-text-secondary">Subtotal</span>
              <span className="text-xl font-extrabold text-text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2" onClick={handleCheckout}>
              <span>Proceed to Checkout</span>
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
