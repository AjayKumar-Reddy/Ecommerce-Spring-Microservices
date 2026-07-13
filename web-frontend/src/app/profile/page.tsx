"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartOverlay from "@/components/CartOverlay";

export default function ProfilePage() {
  const { user, token, login } = useApp();
  
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Sync state with user data on mount/change
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: fullName.trim() ? fullName : undefined,
          address: address.trim() ? address : undefined,
          password: password.trim() ? password : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data || "Failed to update profile");
      }

      // Re-login to update context values
      login(token, data);
      setSuccess("Profile updated successfully!");
      setPassword(""); // clear password field
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 py-10 md:px-10">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <p className="text-sm text-text-secondary">Please sign in to view your profile settings.</p>
          </div>
        ) : (
          <div className="glassmorphism-card rounded-[28px] p-8 md:p-10 shadow-premium">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-white to-primary-hover bg-clip-text text-transparent">Account Settings</h1>
            
            {/* Info Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-text-primary border-b border-white/10 pb-2">Profile Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-secondary">Username</span>
                  <span className="text-sm font-semibold text-text-primary">{user.username}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-secondary">Email Address</span>
                  <span className="text-sm font-semibold text-text-primary">{user.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-secondary">Account Role</span>
                  <span className="text-sm font-semibold text-text-primary uppercase">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-text-primary border-b border-white/10 pb-2">Update Information</h2>
              <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                {error && <div className="text-error text-sm font-semibold mb-2">{error}</div>}
                {success && <div className="text-success text-sm font-semibold mb-2">{success}</div>}

                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs font-semibold text-text-primary">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="bg-white/2 border border-white/10 text-text-primary px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-xs font-semibold text-text-primary">Shipping Address</label>
                  <input
                    type="text"
                    id="address"
                    className="bg-white/2 border border-white/10 text-text-primary px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-xs font-semibold text-text-primary">Change Password (Optional)</label>
                  <input
                    type="password"
                    id="password"
                    className="bg-white/2 border border-white/10 text-text-primary px-4 py-3 rounded-xl outline-none text-sm transition-all duration-300 focus:border-primary focus:bg-white/4"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white py-3.5 px-8 rounded-full text-sm font-bold cursor-pointer self-start shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
