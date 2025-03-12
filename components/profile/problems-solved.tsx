"use client"

export function ProblemsSolved({ expanded = false }: { expanded?: boolean }) {
  const categories = [
    { name: "Fundamentals", count: 22, total: 22, color: "from-green-500 to-emerald-600" },
    { name: "DSA", count: 244, total: 244, color: "from-yellow-500 to-amber-600" },
  ]

  const difficulties = [
    { name: "Easy", count: 122, total: 122, color: "text-green-500" },
    { name: "Medium", count: 107, total: 107, color: "text-yellow-500" },
    { name: "Hard", count: 15, total: 15, color: "text-red-500" },
  ]

  const platforms = [
    { name: "LeetCode", count: 142, color: "from-yellow-500 to-amber-600" },
    { name: "GeeksforGeeks", count: 78, color: "from-green-500 to-emerald-600" },
    { name: "CodeForces", count: 46, color: "from-blue-500 to-indigo-600" },
    { name: "HackerRank", count: 0, color: "from-emerald-500 to-teal-600" },
  ]

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-white">Categories</h3>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{category.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                  <span className="text-2xl font-bold">{category.count}</span>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex items-center justify-center">
                  <div className="w-full bg-[#0d1117] rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${category.color} h-4 rounded-full flex items-center justify-center text-xs text-white font-medium`}
                      style={{ width: "100%" }}
                    >
                      {Math.round((category.count / category.total) * 100)}%
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
        <h3 className="text-lg font-medium mb-4 text-white">Difficulty Levels</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.name}
              className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className={`text-3xl font-bold ${difficulty.color}`}>{difficulty.count}</span>
              <span className="text-sm text-gray-400">{difficulty.name}</span>
            </div>
          ))}
        </div>
      </div>

      {expanded && (
        <>
          {/* Platform Breakdown */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Platform Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex flex-col items-center justify-center p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${platform.color} mb-2 flex items-center justify-center`}
                  >
                    <span className="text-lg font-bold text-white">{platform.name.charAt(0)}</span>
                  </div>
                  <span className="text-2xl font-bold">{platform.count}</span>
                  <span className="text-xs text-gray-400">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Problems */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Recently Solved</h3>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#0d1117] rounded-lg border border-[#30363d] flex justify-between items-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h4 className="font-medium text-white">Two Sum</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-green-500">Easy</span>
                      <span>•</span>
                      <span>Arrays</span>
                      <span>•</span>
                      <span>LeetCode</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 relative z-10">2 days ago</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

