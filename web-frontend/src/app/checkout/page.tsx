"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartOverlay from "@/components/CartOverlay";

export default function CheckoutPage() {
  const { user, cart, cartTotal, clearCart } = useApp();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Sync state with user profile on mount
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setAddress(user.address || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    // Simulate API order creation and payment gateway request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10 md:px-10">
        {success && (
          <div className="fixed inset-0 bg-[#030712]/95 flex items-center justify-center z-[100] animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center bg-[#020617] border border-white/10 p-10 rounded-[28px] max-w-[480px] w-full shadow-premium flex flex-col items-center">
              <div className="text-green-400 mb-6">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">Order Placed!</h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                Thank you for your purchase, {fullName.split(" ")[0]}! Your transaction was successfully simulated. We will process your order shortly.
              </p>
              <button 
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-3.5 rounded-full text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(79,70,229,0.25)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]" 
                onClick={() => router.push("/")}
                style={{ maxWidth: "200px" }}
              >
                Return Home
              </button>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-extrabold mb-8 text-white">Secure Checkout</h1>

        {cart.length === 0 && !success ? (
          <div className="text-center py-20 px-6 bg-[#020617] border border-white/10 rounded-3xl flex flex-col items-center gap-5">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
            <p className="text-slate-400 text-sm">Please add products to your cart before checking out.</p>
            <Link href="/products">
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-3.5 rounded-full text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(79,70,229,0.25)] transition-all duration-300 flex items-center justify-center gap-2" style={{ maxWidth: "200px" }}>Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
            {/* Form */}
            <form onSubmit={handlePlaceOrder} className="bg-[#020617] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-4">Shipping Details</h2>
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="fullName" className="text-xs font-semibold text-white">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="email" className="text-xs font-semibold text-white">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-xs font-semibold text-white">Shipping Address *</label>
                  <input
                    type="text"
                    id="address"
                    className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-4">Payment Details (Simulated)</h2>
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="cardNumber" className="text-xs font-semibold text-white">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                    placeholder="1234 5678 1234 5678"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="expiry" className="text-xs font-semibold text-white">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiry"
                      className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cvv" className="text-xs font-semibold text-white">CVV *</label>
                    <input
                      type="password"
                      id="cvv"
                      className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
                      placeholder="•••"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-3.5 rounded-full text-sm font-bold cursor-pointer mt-5 shadow-[0_4px_15px_rgba(79,70,229,0.25)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]" disabled={loading}>
                {loading ? "Processing..." : `Pay $${(cartTotal + 15).toFixed(2)}`}
              </button>
            </form>

            {/* Order Summary */}
            <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-4" style={{ borderBottomColor: "rgba(255,255,255,0.05)" }}>
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 max-h-[240px] overflow-y-auto mb-5 pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm text-white">
                    <div>
                      <div className="font-semibold truncate max-w-[220px]">{item.product.name}</div>
                      <div className="text-slate-400 text-xs font-medium">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-slate-200">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-3.5 text-sm text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3.5 text-sm text-slate-400 font-medium">
                <span>Shipping</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 mt-4 text-lg font-extrabold text-white">
                <span>Total</span>
                <span>${(cartTotal + 15).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
