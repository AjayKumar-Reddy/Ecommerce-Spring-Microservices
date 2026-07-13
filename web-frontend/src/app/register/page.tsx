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
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-[500px] bg-[#020617] border border-white/10 rounded-[28px] p-8 md:p-10 shadow-premium animate-[fadeIn_0.6s_ease-out]">
        <div className="font-heading text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-6">
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
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
          <span>AURA</span>
        </div>

        <h1 className="text-2xl font-extrabold text-center mb-2 text-white">Create Account</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Sign up to access premium products and recommendations</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-semibold text-center">{error}</div>}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-xs font-semibold text-white">Full Name *</label>
            <input
              type="text"
              id="fullName"
              className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-white">Email Address *</label>
            <input
              type="email"
              id="email"
              className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-semibold text-white">Username *</label>
            <input
              type="text"
              id="username"
              className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-white">Password * (min. 6 chars)</label>
            <input
              type="password"
              id="password"
              className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-xs font-semibold text-white">Account Type *</label>
            <select
              id="role"
              className="bg-slate-900 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm cursor-pointer transition-all duration-300 focus:border-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">Buyer (Standard Customer)</option>
              <option value="SELLER">Seller (Vendor)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="address" className="text-xs font-semibold text-white">Shipping Address</label>
            <input
              type="text"
              id="address"
              className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-300 focus:border-indigo-500"
              placeholder="123 Main St, New York, NY"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-3 rounded-xl text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(79,70,229,0.25)] mt-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 font-semibold underline hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
