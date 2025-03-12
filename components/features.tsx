"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Code2, Braces, Terminal, ChevronRight } from "lucide-react";
import treklogo from "../assets/treklogo.jpg";
import leetcode from "../assets/leetcode.webp";
import gfg from "../assets/gfg.png";
import hackerrank from "../assets/hackerrank.png";
import codechef from "../assets/codechef.jpeg";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "LeetCode",
    description:
      "Master algorithms and ace technical interviews with our curated LeetCode problem sets.",
    logo: leetcode,
    color: "from-yellow-500/20 to-yellow-500/5",
    icon: Code,
  },
  {
    name: "GeeksForGeeks",
    description:
      "Comprehensive DSA tutorials and practice problems to build your computer science foundation.",
    logo: gfg,
    color: "from-green-500/20 to-green-500/5",
    icon: Braces,
  },
  {
    name: "HackerRank",
    description:
      "Improve your coding skills through challenges and prepare for job interviews.",
    logo: hackerrank,
    color: "from-emerald-500/20 to-emerald-500/5",
    icon: Terminal,
  },
  {
    name: "CodeChef",
    description:
      "Participate in competitive programming contests and enhance your problem-solving abilities.",
    logo: codechef,
    color: "from-orange-500/20 to-orange-500/5",
    icon: Code2,
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState("light");

  // Check for theme changes
  useEffect(() => {
    // Initial theme check
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    // Check on load
    checkTheme();

    // Set up a mutation observer to detect theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % platforms.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Line color based on theme
  const lineColor =
    theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const lineGlow =
    theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 mt-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-[50%] h-[80rem] w-[80rem] -translate-x-[50%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-[64rem] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-4xl leading-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 ">
              Elevate YouR CodinG JourneY
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              CodeTrek Integrates with your favorite coding platforms to
              streamline your learning experience
            </p>
          </motion.div>

          {/* Logo Showcase */}
          <div className="relative mt-15 mb-32">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 1000 200">
                {/* Filter for glow effect */}
                <defs>
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                </defs>

                {/* Left connection - GeeksForGeeks */}
                <motion.path
                  d="M500,90 L210,100"
                  stroke={lineColor}
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                {/* Right connection - HackerRank */}
                <motion.path
                  d="M500,110 L800,100"
                  stroke={lineColor}
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                {/* Bottom left connection - LeetCode */}
                <motion.path
                  d="M500,100 L360,200"
                  stroke={lineColor}
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Bottom right connection - CodeChef */}
                <motion.path
                  d="M500,100 L650,200"
                  stroke={lineColor}
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Animated dots along the lines */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={lineColor}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [500, 350],
                    y: [100, 200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 1,
                  }}
                />

                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={lineColor}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [500, 650],
                    y: [100, 200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 1.5,
                  }}
                />

                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={lineColor}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [500, 200],
                    y: [100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 2,
                  }}
                />

                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={lineColor}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [500, 800],
                    y: [100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 2.5,
                  }}
                />
              </svg>
            </div>

            {/* Platform Logos */}
            <div className="relative flex justify-center items-center h-[300px]">
              {/* Center Logo - CodeTrek */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute z-10 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                style={{
                  top: "100px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-20 w-20 rounded-xl overflow-hidden">
                  <Image
                    src={treklogo || "/placeholder.svg?height=80&width=80"}
                    alt="CodeTrek Logo"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </motion.div>

              {/* Left Logo - GeeksForGeeks */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute z-10 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                style={{
                  top: "100px",
                  left: "20%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                  <Image
                    src={gfg || "/placeholder.svg?height=64&width=64"}
                    alt="GeeksForGeeks Logo"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground">
                  GeeksForGeeks
                </span>
              </motion.div>

              {/* Right Logo - HackerRank */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute z-10 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                style={{
                  top: "100px",
                  left: "80%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                  <Image
                    src={hackerrank || "/placeholder.svg?height=64&width=64"}
                    alt="HackerRank Logo"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground">
                  HackerRank
                </span>
              </motion.div>

              {/* Bottom Left Logo - LeetCode */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute z-10 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                style={{
                  top: "200px",
                  left: "35%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                  <Image
                    src={leetcode || "/placeholder.svg?height=64&width=64"}
                    alt="LeetCode Logo"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground">
                  LeetCode
                </span>
              </motion.div>

              {/* Bottom Right Logo - CodeChef */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute z-10 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                style={{
                  top: "200px",
                  left: "65%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                  <Image
                    src={codechef || "/placeholder.svg?height=64&width=64"}
                    alt="CodeChef Logo"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground">
                  CodeChef
                </span>
              </motion.div>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`group cursor-pointer rounded-xl border bg-background p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
                  activeIndex === index ? "ring-2 ring-yellow/50" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${platform.color}`}
                >
                  <platform.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{platform.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {platform.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-yellow-500">
                  <span>Explore integration</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button size="lg" className="rounded-full px-8">
              Connect Your Accounts
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Sync your progress across platforms and track your coding journey
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
