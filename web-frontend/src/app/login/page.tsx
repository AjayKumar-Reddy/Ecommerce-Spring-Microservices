"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data || "Invalid username or password");
      }

      login(data.token, data.user);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_10%_20%,rgba(139,92,246,0.1)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.08)_0%,transparent_40%)] p-5">
      <div className="w-full max-w-[440px] glassmorphism-card rounded-[28px] p-8 md:p-10 shadow-premium animate-[fadeIn_0.6s_ease-out]">
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

        <h1 className="text-2xl font-extrabold text-center mb-2 text-text-primary">Welcome Back</h1>
        <p className="text-sm text-text-secondary text-center mb-8">Enter your details to sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-xs font-semibold text-center">{error}</div>}

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs font-semibold text-text-primary">Username</label>
            <input
              type="text"
              id="username"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4 focus:shadow-[0_0_10px_rgba(139,92,246,0.15)] placeholder:text-text-muted"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-semibold text-text-primary">Password</label>
            <input
              type="password"
              id="password"
              className="bg-white/2 border border-white/10 text-text-primary px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4 focus:shadow-[0_0_10px_rgba(139,92,246,0.15)] placeholder:text-text-muted"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] mt-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-text-secondary text-center mt-6">
          Don&rsquo;t have an account?{" "}
          <Link href="/register" className="text-primary-hover font-semibold underline hover:text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
