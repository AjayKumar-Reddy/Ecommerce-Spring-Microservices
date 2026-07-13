"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { user, logout, cartCount } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 right-0 h-[70px] glassmorphism flex items-center justify-between px-6 md:px-10 z-50 shadow-premium transition-all duration-300">
      <Link href="/" className="font-heading text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white to-primary bg-clip-text text-transparent flex items-center gap-2 cursor-pointer">
        <svg
          width="28"
          height="28"
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
      </Link>

      <ul className="flex gap-8 list-none">
        <li>
          <Link
            href="/"
            className={`text-sm font-medium cursor-pointer relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-full ${
              pathname === "/" ? "text-text-primary after:w-full" : "text-text-secondary hover:text-text-primary after:w-0"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className={`text-sm font-medium cursor-pointer relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-full ${
              pathname === "/products" ? "text-text-primary after:w-full" : "text-text-secondary hover:text-text-primary after:w-0"
            }`}
          >
            Shop
          </Link>
        </li>
      </ul>

      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-[300px] transition-all duration-300 focus-within:border-primary focus-within:bg-white/10 focus-within:shadow-[0_0_10px_rgba(139,92,246,0.2)]">
        <span className="text-text-secondary cursor-pointer flex items-center" onClick={handleSearchSubmit}>
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
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent border-none text-text-primary text-sm outline-none w-full pl-2 placeholder:text-text-muted"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-5">
        <button 
          className="bg-transparent border border-white/10 text-text-primary cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full bg-white/3 transition-all duration-300 hover:bg-white/10 hover:border-primary hover:text-primary-hover hover:-translate-y-0.5" 
          onClick={onCartClick} 
          aria-label="Open Cart"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-primary text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <Link 
              href="/profile" 
              className="bg-transparent border border-white/10 text-text-primary cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full bg-white/3 transition-all duration-300 hover:bg-white/10 hover:border-primary hover:text-primary-hover hover:-translate-y-0.5" 
              aria-label="User Profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <span className="text-sm font-semibold text-text-primary hidden sm:inline">{user.fullName.split(" ")[0]}</span>
            <button className="bg-transparent border border-error text-error px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 hover:bg-error hover:text-white hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)]" onClick={() => { logout(); router.push("/"); }}>
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-full text-sm font-semibold cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)]">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
