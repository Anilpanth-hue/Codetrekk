"use client";
import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background py-10 relative z-10">
      <div className="container flex flex-col items-center justify-center space-y-8">
        {/* Top navigation links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <Link
            href="/faq"
            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/support"
            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
          >
            Support
          </Link>
          <Link
            href="/privacy"
            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/timeline"
            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/terms"
            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6">
          <Link
            href="https://linkedin.com/anil-panth-b060a2256"
            className="block rounded-md border border-gray-700 p-2 hover:border-gray-500 transition-colors"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </Link>
          <Link
            href="https://x.com/AnilPanth6"
            className="block rounded-md border border-gray-700 p-2 hover:border-gray-500 transition-colors"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </Link>
          <Link
            href="https://instagram.com/codetrek"
            className="block rounded-md border border-gray-700 p-2 hover:border-gray-500 transition-colors"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Copyright text */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CodeTrek, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
