"use client"

export function TopicAnalysis({ expanded = false }: { expanded?: boolean }) {
  const topics = [
    { name: "Arrays", count: 104, percentage: 75 },
    { name: "Data Structures", count: 50, percentage: 36 },
    { name: "Algorithms", count: 44, percentage: 32 },
    { name: "Dynamic Programming", count: 38, percentage: 27 },
    { name: "Strings", count: 30, percentage: 22 },
  ]

  const extendedTopics = [
    ...topics,
    { name: "Graphs", count: 25, percentage: 18 },
    { name: "Trees", count: 22, percentage: 16 },
    { name: "Greedy", count: 18, percentage: 13 },
    { name: "Sorting", count: 15, percentage: 11 },
    { name: "Searching", count: 12, percentage: 9 },
  ]

  const displayTopics = expanded ? extendedTopics : topics

  return (
    <div className="space-y-4">
      {displayTopics.map((topic) => (
        <div key={topic.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{topic.name}</span>
            <span className="text-gray-400">{topic.count}</span>
          </div>
          <div className="w-full bg-[#0d1117] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
              style={{ width: `${topic.percentage}%` }}
            />
          </div>
        </div>
      ))}

      {expanded && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 text-white">Topic Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-medium text-blue-400 mb-2">Focus Areas</h4>
              <p className="text-sm text-gray-400 mb-2">
                Based on your performance, consider focusing on these topics:
              </p>
              <ul className="text-sm space-y-1 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Dynamic Programming
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Graphs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Trees
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-medium text-green-400 mb-2">Strong Areas</h4>
              <p className="text-sm text-gray-400 mb-2">You're performing well in these topics:</p>
              <ul className="text-sm space-y-1 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Arrays
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Data Structures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Algorithms
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

