import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gfgUsername = searchParams.get("gfgUsername") || "anilpaj39t"
  const leetcodeUsername = searchParams.get("leetcodeUsername") || "anil123_0"

  try {
    // Fetch data from both platforms in parallel
    const [gfgResponse, leetcodeResponse] = await Promise.all([
      fetch(
        `${request.headers.get("host") ? `https://${request.headers.get("host")}` : ""}/api/gfg?username=${gfgUsername}`,
      ),
      fetch(
        `${request.headers.get("host") ? `https://${request.headers.get("host")}` : ""}/api/leetcode?username=${leetcodeUsername}`,
      ),
    ])

    // Parse the responses
    const gfgData = await gfgResponse.json()
    const leetcodeData = await leetcodeResponse.json()

    // Calculate combined stats
    const totalProblemsSolved =
      (gfgData.success ? gfgData.data.problemsSolved.total : 85) +
      (leetcodeData.success ? leetcodeData.data.problemsSolved.total : 130)

    // Combine difficulty levels
    const difficulties = [
      {
        name: "Easy",
        count:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[0].count : 40) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.easy : 65),
        total:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[0].count : 40) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.easy : 65),
        color: "text-green-500",
      },
      {
        name: "Medium",
        count:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[1].count : 35) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.medium : 50),
        total:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[1].count : 35) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.medium : 50),
        color: "text-yellow-500",
      },
      {
        name: "Hard",
        count:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[2].count : 10) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.hard : 15),
        total:
          (gfgData.success ? gfgData.data.problemsSolved.difficulties[2].count : 10) +
          (leetcodeData.success ? leetcodeData.data.problemsSolved.hard : 15),
        color: "text-red-500",
      },
    ]

    // Create combined platforms data
    const platforms = [
      {
        name: "GeeksforGeeks",
        count: gfgData.success ? gfgData.data.problemsSolved.total : 85,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "LeetCode",
        count: leetcodeData.success ? leetcodeData.data.problemsSolved.total : 130,
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
    ]

    // Combine categories
    const categories = [
      {
        name: "Fundamentals",
        count: gfgData.success ? gfgData.data.problemsSolved.categories[0].count : 0,
        total: gfgData.success ? gfgData.data.problemsSolved.categories[0].total : 0,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "DSA",
        count: totalProblemsSolved,
        total: totalProblemsSolved,
        color: "from-yellow-500 to-amber-600",
      },
    ]

    return NextResponse.json({
      success: true,
      data: {
        gfg: gfgData.success ? gfgData.data : null,
        leetcode: leetcodeData.success ? leetcodeData.data : null,
        combined: {
          totalProblemsSolved,
          categories,
          difficulties,
          platforms,
        },
      },
      recentProblems: gfgData.recentProblems || [],
    })
  } catch (err: any) {
    console.error("Error:", err.message)
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Something went wrong",
        // Return default combined data
        data: {
          combined: {
            totalProblemsSolved: 215, // 85 + 130
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
                count: 105, // 40 + 65
                total: 105,
                color: "text-green-500",
              },
              {
                name: "Medium",
                count: 85, // 35 + 50
                total: 85,
                color: "text-yellow-500",
              },
              {
                name: "Hard",
                count: 25, // 10 + 15
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
          },
        },
      },
      { status: 500 },
    )
  }
}
