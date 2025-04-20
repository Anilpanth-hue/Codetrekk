"use client";

import { useEffect, useState } from "react";
import { ProblemsSolved } from "./problems-solved";
import { HeatMap } from "./heat-map";

interface CombinedProfileProps {
  gfgUsername?: string;
  leetcodeUsername?: string;
}

export function CombinedProfile({
  gfgUsername = "anilpaj39t",
  leetcodeUsername = "anil123_0",
}: CombinedProfileProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/profile-stats?gfgUsername=${gfgUsername}&leetcodeUsername=${leetcodeUsername}`
        );
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch profile data");
        }

        setProfileData(data.data);
        setError(null);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching profile data"
        );
        console.error("Error fetching combined profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [gfgUsername, leetcodeUsername]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-lg">
        <h3 className="text-lg font-medium text-red-500 mb-2">
          Error Loading Profile
        </h3>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const combined = profileData?.combined || {
    totalProblemsSolved: 215,
    categories: [
      {
        name: "Fundamentals",
        count: 0,
        total: 0,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "DSA",
        count: 215,
        total: 215,
        color: "from-yellow-500 to-amber-600",
      },
    ],
    difficulties: [
      {
        name: "Easy",
        count: 105,
        total: 105,
        color: "text-green-500",
      },
      {
        name: "Medium",
        count: 85,
        total: 85,
        color: "text-yellow-500",
      },
      {
        name: "Hard",
        count: 25,
        total: 25,
        color: "text-red-500",
      },
    ],
    platforms: [
      {
        name: "GeeksforGeeks",
        count: 85,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "LeetCode",
        count: 130,
        color: "from-yellow-500 to-amber-600",
      },
      {
        name: "CodeForces",
        count: 0,
        color: "from-blue-500 to-indigo-600",
      },
      {
        name: "HackerRank",
        count: 0,
        color: "from-emerald-500 to-teal-600",
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
        <div>
          <h2 className="text-2xl font-bold text-white">Coding Profile</h2>
          <p className="text-gray-400">Combined Statistics</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">
              {combined.totalProblemsSolved}
            </div>
            <div className="text-xs text-gray-400">Problems Solved</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">
              {profileData?.gfg?.activeDays || 0}
            </div>
            <div className="text-xs text-gray-400">GFG Active Days</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">
              {Math.max(
                profileData?.gfg?.streak || 0,
                profileData?.leetcode?.streak || 0
              )}
            </div>
            <div className="text-xs text-gray-400">Best Streak</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
          <h3 className="text-xl font-medium mb-4 text-white">
            Problem Solving Stats
          </h3>
          <ProblemsSolved
            expanded={true}
            data={{
              total: combined.totalProblemsSolved,
              categories: combined.categories,
              difficulties: combined.difficulties,
            }}
            platforms={combined.platforms}
            recentProblems={profileData?.recentProblems || []}
          />
        </div>

        <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
          <h3 className="text-xl font-medium mb-4 text-white">
            Activity Heatmap
          </h3>
          <HeatMap days={profileData?.gfg?.heatmap || []} />
        </div>
      </div>
    </div>
  );
}
