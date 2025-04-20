"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // This is a placeholder for your actual password reset API
      // You'll need to implement this endpoint on your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* Background gradients similar to home page */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="z-10 w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/treklogo.jpg"
                alt="CodeTrek Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              We'll send you instructions to reset your password
            </p>
          </div>

          <div className="mt-8 bg-[#111133]/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Check your email
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  We've sent password reset instructions to your email address.
                </p>
                <div className="mt-6">
                  <Link
                    href="/auth/login"
                    className="flex w-full justify-center items-center rounded-md bg-[#1a1a3a] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#222250] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 border border-gray-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 bg-[#1a1a3a] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 p-3"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center items-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send reset instructions"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    <ArrowLeft className="inline-block mr-1 h-3 w-3" />
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
