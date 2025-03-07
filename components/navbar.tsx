"use client";
import Link from "next/link";
import Image from "next/image"; // Import Image from Next.js
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import treklogo from "../assets/treklogo.jpg"; // Importing Image

export default function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Logo Image */}
          <Image
            src={treklogo}
            alt="Trek Logo"
            className="h-75 w-12 rounded-full"
          />
          <span className="font-bold">CodeTrek</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/solutions"
            className="transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/industries"
            className="transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            Ask/Blog
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Contact Us
          </Button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            defaultChecked={theme === "dark"}
          >
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
