"use client";

import { useEffect, useState } from "react";
import { ProblemsSolved } from "./problems-solved";
import { HeatMap } from "./heat-map";

interface GfgProfileData {
  username: string;
  problemsSolved: {
    total: number;
    categories: Array<{
      name: string;
      count: number;
      total: number;
      color: string;
    }>;
    difficulties: Array<{
      name: string;
      count: number;
      total: number;
      color: string;
    }>;
  };
  activeDays: number;
  streak: number;
  heatmap: Array<{
    date: string;
    count: number;
  }>;
}

interface RecentProblem {
  name: string;
  difficulty: string;
  timeAgo: string;
  platform: string;
}

export function GfgProfile({ username = "anilpaj39t" }: { username?: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<GfgProfileData | null>(null);
  const [recentProblems, setRecentProblems] = useState<RecentProblem[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gfg?username=${username}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch profile data");
        }

        // Make sure data has the expected structure
        if (data.data) {
          setProfileData(data.data);
          setRecentProblems(data.recentProblems || []);
        } else {
          throw new Error("Invalid data structure received from API");
        }

        setError(null);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching profile data"
        );
        console.error("Error fetching GFG profile:", err);
        // Set default empty data structure
        setProfileData({
          username: username,
          problemsSolved: {
            total: 0,
            categories: [
              {
                name: "Fundamentals",
                count: 0,
                total: 0,
                color: "from-green-500 to-emerald-600",
              },
              {
                name: "DSA",
                count: 0,
                total: 0,
                color: "from-yellow-500 to-amber-600",
              },
            ],
            difficulties: [
              { name: "Easy", count: 0, total: 0, color: "text-green-500" },
              { name: "Medium", count: 0, total: 0, color: "text-yellow-500" },
              { name: "Hard", count: 0, total: 0, color: "text-red-500" },
            ],
          },
          activeDays: 0,
          streak: 0,
          heatmap: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {profileData?.username || username}
          </h2>
          <p className="text-gray-400">GeeksforGeeks Profile</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">
              {profileData?.problemsSolved?.total || 0}
            </div>
            <div className="text-xs text-gray-400">Problems Solved</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">
              {profileData?.activeDays || 0}
            </div>
            <div className="text-xs text-gray-400">Active Days</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">
              {profileData?.streak || 0}
            </div>
            <div className="text-xs text-gray-400">Current Streak</div>
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
            data={profileData?.problemsSolved}
            recentProblems={recentProblems}
            platforms={[
              { name: "GeeksforGeeks", count: 0, color: "text-green-500" },
            ]} // Add the required platforms property
          />
        </div>

        <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
          <h3 className="text-xl font-medium mb-4 text-white">
            Activity Heatmap
          </h3>
          <HeatMap days={profileData?.heatmap || []} />
        </div>
      </div>
    </div>
  );
}
