"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Calendar,
  Code2,
  Github,
  Globe,
  Mail,
  MapPin,
  RefreshCw,
  User,
  BarChart2,
  PieChart,
  Activity,
  Zap,
  Layers,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { HeatMap } from "@/components/profile/heat-map";
import { TopicAnalysis } from "@/components/profile/topic-analysis";
import { ProblemsSolved } from "@/components/profile/problems-solved";
import { Badge } from "@/components/ui/badge";
import { ConnectModal } from "@/components/profile/connect-modal";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
  username: string;
}

export default function ProfileTrackerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalQuestions: 266,
    totalActiveDays: 128,
    maxStreak: 8,
    currentStreak: 0,
    awards: 2,
    lastRefresh: new Date().toISOString(),
  });

  useEffect(() => {
    // Check if user has connected platforms
    const storedPlatforms = localStorage.getItem("connectedPlatforms");
    const storedEmail = localStorage.getItem("userEmail");

    if (!storedPlatforms || !storedEmail) {
      router.push("/");
      return;
    }

    const parsedPlatforms = JSON.parse(storedPlatforms);

    // Add icons to platforms
    const platformsWithIcons = parsedPlatforms.map((platform: any) => {
      let icon;
      if (platform.id === "leetcode") icon = <Code2 className="h-5 w-5" />;
      else if (platform.id === "gfg") icon = <Code2 className="h-5 w-5" />;
      else if (platform.id === "codeforces")
        icon = <Code2 className="h-5 w-5" />;
      else icon = <Code2 className="h-5 w-5" />;

      return {
        ...platform,
        icon,
      };
    });

    setPlatforms(platformsWithIcons);
    setEmail(storedEmail);

    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  const refreshData = () => {
    setLoading(true);

    // Simulate refreshing data
    setTimeout(() => {
      setLoading(false);
      setStats({
        ...stats,
        lastRefresh: new Date().toISOString(),
      });
    }, 1500);
  };

  if (platforms.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 w-full" />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Code Trek</h1>
            <p className="text-gray-400">
              Track your coding journey across multiple platforms
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#30363d] bg-[#161b22] hover:bg-[#1f2937] text-white"
              onClick={refreshData}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh Data
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-[#30363d] bg-[#161b22] hover:bg-[#1f2937] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Layers className="h-4 w-4 mr-2" />
              Update Profiles
            </Button>

            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="bg-[#161b22] border-[#30363d] lg:col-span-1 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 h-24 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-[#0d1117] p-1 border-4 border-[#161b22]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    <User className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <CardHeader className="flex flex-col items-center text-center pt-14">
              <CardTitle className="text-xl font-bold">
                Developer Profile
              </CardTitle>
              <CardDescription className="text-gray-400">
                {email}
              </CardDescription>

              <div className="flex gap-2 mt-4">
                {platforms.map((platform) => (
                  <Badge
                    key={platform.id}
                    className={`bg-gradient-to-r ${
                      platform.id === "leetcode"
                        ? "from-yellow-500 to-amber-600"
                        : platform.id === "gfg"
                        ? "from-green-500 to-emerald-600"
                        : platform.id === "codeforces"
                        ? "from-blue-500 to-indigo-600"
                        : "from-emerald-500 to-teal-600"
                    } hover:from-blue-600 hover:to-purple-600 transition-all border-0`}
                    title={`${platform.name}: ${platform.username}`}
                  >
                    {platform.icon}
                    <span className="ml-1">{platform.name}</span>
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <User className="h-4 w-4" />
                  <span>@{platforms[0]?.username || "username"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Github className="h-4 w-4" />
                  <span>github.com/{platforms[0]?.username || "username"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Globe className="h-4 w-4" />
                  <span>portfolio.dev</span>
                </div>

                <div className="pt-4 border-t border-[#30363d]">
                  <h3 className="font-medium mb-4 flex items-center gap-2 text-gray-300">
                    <Code2 className="h-4 w-4 text-blue-400" />
                    Connected Platforms
                  </h3>

                  <div className="space-y-3">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center justify-between p-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-r ${
                              platform.id === "leetcode"
                                ? "from-yellow-500 to-amber-600"
                                : platform.id === "gfg"
                                ? "from-green-500 to-emerald-600"
                                : platform.id === "codeforces"
                                ? "from-blue-500 to-indigo-600"
                                : "from-emerald-500 to-teal-600"
                            }`}
                          >
                            {platform.icon}
                          </div>
                          <span className="text-sm text-gray-300">
                            {platform.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          @{platform.username}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-600" />
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Total Questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-12 w-24 bg-[#0d1117]" />
                  ) : (
                    <h2 className="text-4xl font-bold">
                      {stats.totalQuestions}
                    </h2>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-600" />
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Active Days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-12 w-24 bg-[#0d1117]" />
                  ) : (
                    <h2 className="text-4xl font-bold">
                      {stats.totalActiveDays}
                    </h2>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600" />
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Current Streak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-12 w-24 bg-[#0d1117]" />
                  ) : (
                    <div className="flex items-end gap-2">
                      <h2 className="text-4xl font-bold">
                        {stats.currentStreak}
                      </h2>
                      <span className="text-sm text-gray-400 mb-1">
                        Max: {stats.maxStreak}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-yellow-500 to-yellow-600" />
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Awards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-12 w-24 bg-[#0d1117]" />
                  ) : (
                    <h2 className="text-4xl font-bold">{stats.awards}</h2>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Heat Map */}
            <Card className="bg-[#161b22] border-[#30363d]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Coding Activity
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    201 submissions in past 6 months
                  </CardDescription>
                </div>
                <div className="text-sm text-gray-400">
                  <span className="mr-4">Max Streak: {stats.maxStreak}</span>
                  <span>Current Streak: {stats.currentStreak}</span>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-32 w-full bg-[#0d1117]" />
                ) : (
                  <HeatMap />
                )}
              </CardContent>
            </Card>

            {/* Tabs for different sections */}
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="bg-[#0d1117] border border-[#30363d] p-1 rounded-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="problems"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Problems
                </TabsTrigger>
                <TabsTrigger
                  value="topics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Topics
                </TabsTrigger>
                <TabsTrigger
                  value="platforms"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Platforms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                        Problems Solved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-64 w-full bg-[#0d1117]" />
                      ) : (
                        <ProblemsSolved />
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-blue-400" />
                        DSA Topic Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-64 w-full bg-[#0d1117]" />
                      ) : (
                        <TopicAnalysis />
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-400" />
                      Awards & Achievements
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Badges and achievements earned across platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <Skeleton
                            key={i}
                            className="h-24 w-full bg-[#0d1117]"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-2 flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-sm font-medium">100 Days</span>
                          <span className="text-xs text-gray-400">
                            Active Coder
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mb-2 flex items-center justify-center">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-sm font-medium">
                            Top Contributor
                          </span>
                          <span className="text-xs text-gray-400">
                            LeetCode
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 mb-2 flex items-center justify-center">
                            <Zap className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-sm font-medium">
                            7 Day Streak
                          </span>
                          <span className="text-xs text-gray-400">
                            CodeForces
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 mb-2 flex items-center justify-center">
                            <Code2 className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-sm font-medium">
                            DSA Master
                          </span>
                          <span className="text-xs text-gray-400">
                            GeeksforGeeks
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="problems" className="space-y-4">
                <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      Problems Solved
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Detailed breakdown of problems solved by category and
                      difficulty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-96 w-full bg-[#0d1117]" />
                    ) : (
                      <div className="space-y-8">
                        <ProblemsSolved expanded />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topics" className="space-y-4">
                <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-400" />
                      DSA Topic Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Detailed breakdown of your performance across DSA topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-96 w-full bg-[#0d1117]" />
                    ) : (
                      <div className="space-y-8">
                        <TopicAnalysis expanded />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platforms.map((platform) => (
                    <Card
                      key={platform.id}
                      className="bg-[#161b22] border-[#30363d] overflow-hidden"
                    >
                      <div
                        className={`h-1 w-full bg-gradient-to-r ${
                          platform.id === "leetcode"
                            ? "from-yellow-500 to-amber-600"
                            : platform.id === "gfg"
                            ? "from-green-500 to-emerald-600"
                            : platform.id === "codeforces"
                            ? "from-blue-500 to-indigo-600"
                            : "from-emerald-500 to-teal-600"
                        }`}
                      />
                      <CardHeader className="flex flex-row items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                            platform.id === "leetcode"
                              ? "from-yellow-500 to-amber-600"
                              : platform.id === "gfg"
                              ? "from-green-500 to-emerald-600"
                              : platform.id === "codeforces"
                              ? "from-blue-500 to-indigo-600"
                              : "from-emerald-500 to-teal-600"
                          } flex items-center justify-center`}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <CardTitle>{platform.name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            @{platform.username}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <Skeleton className="h-32 w-full bg-[#0d1117]" />
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Problems Solved
                              </span>
                              <span className="font-medium">
                                {platform.id === "leetcode"
                                  ? 142
                                  : platform.id === "gfg"
                                  ? 78
                                  : platform.id === "codeforces"
                                  ? 46
                                  : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Contest Rating
                              </span>
                              <span className="font-medium">
                                {platform.id === "leetcode"
                                  ? 1842
                                  : platform.id === "codeforces"
                                  ? 1356
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Last Active</span>
                              <span className="font-medium">2 days ago</span>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-2 border-[#30363d] bg-[#0d1117] hover:bg-[#161b22] text-white"
                            >
                              View Full Profile
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          Last refreshed: {new Date(stats.lastRefresh).toLocaleString()}
        </div>
      </div>

      <ConnectModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
