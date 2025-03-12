"use client";
import { Button } from "@/components/ui/button";
import TrekCard from "./trek-card";
import { ArrowRight, Code, Share2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative  border-gray-800 py-16 md:py-24 overflow-hidden bg-gradient-to-b ">
      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left side: Content */}
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center rounded-full border border-indigo-900 bg-indigo-950/30 px-3 py-1 text-sm font-medium text-indigo-400">
              <Code className="mr-1 h-3.5 w-3.5" />
              <span>Introducing CodeTrek</span>
            </div>

            <h2 className="font-bold text-3xl leading-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Showcase Your Coding Journey
            </h2>

            <p className="max-w-[42rem] text-lg leading-relaxed text-gray-400">
              Track and display your coding progress across multiple platforms
              like LeetCode, GeeksForGeeks, HackerRank, and CodeChef. Create
              your personalized profile card to share with recruiters and fellow
              developers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="cursor-pointer relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                Get Your Trek Card <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share Example
              </Button>
            </div>

            <p className="text-sm text-gray-400 pt-4">
              Sync your progress across platforms and track your coding journey
            </p>
          </div>

          {/* Right side: Card Preview */}
          <div className="relative mx-auto lg:mx-0">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-xl" />
            <div className="relative rotate-1 transform transition-transform duration-300 hover:rotate-3">
              <TrekCard
                name="Anil Panth"
                username="anilcode"
                avatarUrl="/placeholder.svg?height=400&width=400"
                bio="Full-stack developer passionate about algorithms and problem solving"
                platforms={[
                  {
                    platform: "LeetCode",
                    score: 1500,
                    solved: 300,
                    total: 500,
                  },
                  {
                    platform: "GeekforGeeks",
                    score: 1200,
                    solved: 200,
                    total: 400,
                  },
                  {
                    platform: "HackerRank",
                    score: 1200,
                    solved: 200,
                    total: 400,
                  },
                  {
                    platform: "CodeChef",
                    score: 1200,
                    solved: 200,
                    total: 400,
                  },
                ]}
                skills={["JavaScript", "React", "Node.js"]}
              />
            </div>

            {/* Floating heart emoji */}
            <div className="absolute -top-6 right-0 h-12 w-12 rounded-full bg-red-400 flex items-center justify-center text-2xl shadow-lg">
              ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
