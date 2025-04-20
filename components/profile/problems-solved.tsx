"use client";

interface ProblemCategory {
  name: string;
  count: number;
  total: number;
  color: string;
}

interface ProblemDifficulty {
  name: string;
  count: number;
  total: number;
  color: string;
}

interface Platform {
  name: string;
  count: number;
  color: string;
}

interface ProblemsSolvedProps {
  expanded?: boolean;
  data?: {
    total: number;
    categories: ProblemCategory[];
    difficulties: ProblemDifficulty[];
  };
  platforms?: Platform[];
  recentProblems?: Array<{
    name: string;
    difficulty: string;
    timeAgo: string;
    platform: string;
  }>;
}

export function ProblemsSolved({
  expanded = false,
  data,
  platforms,
  recentProblems = [],
}: ProblemsSolvedProps) {
  // If data is undefined, provide default values
  const safeData = data || {
    total: 215, // Default combined total
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
      { name: "Easy", count: 105, total: 105, color: "text-green-500" },
      { name: "Medium", count: 85, total: 85, color: "text-yellow-500" },
      { name: "Hard", count: 25, total: 25, color: "text-red-500" },
    ],
  };

  // Default platforms if not provided
  const safePlatforms = platforms || [
    {
      name: "GeeksforGeeks",
      count: 85,
      color: "from-green-500 to-emerald-600",
    },
    { name: "LeetCode", count: 130, color: "from-yellow-500 to-amber-600" },
    { name: "CodeForces", count: 0, color: "from-blue-500 to-indigo-600" },
    { name: "HackerRank", count: 0, color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-white">Categories</h3>
        <div className="space-y-6">
          {safeData.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{category.name}</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}
                  />
                  <span className="text-2xl font-bold">{category.count}</span>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex items-center justify-center">
                  <div className="w-full bg-[#0d1117] rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${category.color} h-4 rounded-full flex items-center justify-center text-xs text-white font-medium`}
                      style={{
                        width:
                          category.total > 0
                            ? `${Math.round(
                                (category.count / category.total) * 100
                              )}%`
                            : "0%",
                      }}
                    >
                      {category.total > 0
                        ? Math.round((category.count / category.total) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Levels */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-white">
          Difficulty Levels
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {safeData.difficulties.map((difficulty) => (
            <div
              key={difficulty.name}
              className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className={`text-3xl font-bold ${difficulty.color}`}>
                {difficulty.count}
              </span>
              <span className="text-sm text-gray-400">{difficulty.name}</span>
            </div>
          ))}
        </div>
      </div>

      {expanded && (
        <>
          {/* Platform Breakdown */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">
              Platform Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {safePlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${platform.color} mb-2 flex items-center justify-center`}
                  >
                    <span className="text-lg font-bold text-white">
                      {platform.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-2xl font-bold">{platform.count}</span>
                  <span className="text-xs text-gray-400">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Problems */}
          {recentProblems.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-white">
                Recently Solved
              </h3>
              <div className="space-y-2">
                {recentProblems.map((problem, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#0d1117] rounded-lg border border-[#30363d] flex justify-between items-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <h4 className="font-medium text-white">{problem.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span
                          className={
                            problem.difficulty.toLowerCase().includes("easy")
                              ? "text-green-500"
                              : problem.difficulty
                                  .toLowerCase()
                                  .includes("medium")
                              ? "text-yellow-500"
                              : "text-red-500"
                          }
                        >
                          {problem.difficulty}
                        </span>
                        <span>•</span>
                        <span>{problem.platform}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 relative z-10">
                      {problem.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
