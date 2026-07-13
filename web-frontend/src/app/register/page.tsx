"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !fullName.trim() || !password.trim()) {
      setError("Please fill out all required fields");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, fullName, password, role, address }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data || "Failed to register user");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_10%_20%,rgba(139,92,246,0.1)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.08)_0%,transparent_40%)] p-5">
      <div className="w-full max-w-[500px] glassmorphism-card rounded-[28px] p-8 md:p-10 shadow-premium animate-[fadeIn_0.6s_ease-out]">
        <div className="font-heading text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-primary bg-clip-text text-transparent flex items-center justify-center gap-2 mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L2 9L16 16L30 9L16 2Z"
              fill="url(#logo-grad)"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 16L16 23L30 16"
              stroke="url(#logo-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 23L16 30L30 23"
              stroke="url(#logo-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logo-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <span>AURA</span>
        </div>

        <h1 className="text-2xl font-extrabold text-center mb-2 text-text-primary">Create Account</h1>
        <p className="text-sm text-text-secondary text-center mb-8">Sign up to access premium products and recommendations</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-xs font-semibold text-center">{error}</div>}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-xs font-semibold text-text-primary">Full Name *</label>
            <input
              type="text"
              id="fullName"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-text-primary">Email Address *</label>
            <input
              type="email"
              id="email"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-semibold text-text-primary">Username *</label>
            <input
              type="text"
              id="username"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-text-primary">Password * (min. 6 chars)</label>
            <input
              type="password"
              id="password"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-xs font-semibold text-text-primary">Account Type *</label>
            <select
              id="role"
              className="bg-slate-900 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm cursor-pointer transition-all duration-300 focus:border-primary"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">Buyer (Standard Customer)</option>
              <option value="SELLER">Seller (Vendor)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="address" className="text-xs font-semibold text-text-primary">Shipping Address</label>
            <input
              type="text"
              id="address"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
              placeholder="123 Main St, New York, NY"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] mt-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-text-secondary text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-hover font-semibold underline hover:text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
