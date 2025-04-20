import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "anilpaj39t"
  const url = `https://www.geeksforgeeks.org/user/${username}/`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract profile data
    const profileData = {
      username: username,
      // Problems solved
      problemsSolved: {
        total: 85, // Default value you mentioned
        categories: [
          {
            name: "Fundamentals",
            count: 0,
            total: 0,
            color: "from-green-500 to-emerald-600",
          },
          {
            name: "DSA",
            count: 85, // Default value you mentioned
            total: 85, // Default value you mentioned
            color: "from-yellow-500 to-amber-600",
          },
        ],
        difficulties: [
          {
            name: "Easy",
            count: 40, // Estimated distribution
            total: 40,
            color: "text-green-500",
          },
          {
            name: "Medium",
            count: 35, // Estimated distribution
            total: 35,
            color: "text-yellow-500",
          },
          {
            name: "Hard",
            count: 10, // Estimated distribution
            total: 10,
            color: "text-red-500",
          },
        ],
      },
      activeDays: 0,
      streak: 0,
      heatmap: [],
    }

    // Try to extract total problems solved
    try {
      const problemsSolvedText = $(
        '.profile_details_container .profile_details:contains("Problems Solved") .profile_details_value',
      )
        .text()
        .trim()

      if (problemsSolvedText && Number.parseInt(problemsSolvedText, 10) > 0) {
        profileData.problemsSolved.total = Number.parseInt(problemsSolvedText, 10)
      }

      // Update DSA category with total problems
      profileData.problemsSolved.categories[1].count = profileData.problemsSolved.total
      profileData.problemsSolved.categories[1].total = profileData.problemsSolved.total
    } catch (e) {
      console.error("Error parsing problems solved:", e)
    }

    // Try to extract active days
    try {
      const activeDaysText = $(
        '.profile_details_container .profile_details:contains("Active Days") .profile_details_value',
      )
        .text()
        .trim()

      if (activeDaysText) {
        profileData.activeDays = Number.parseInt(activeDaysText, 10) || 0
      }
    } catch (e) {
      console.error("Error parsing active days:", e)
    }

    // Try to extract streak
    try {
      const streakText = $('.profile_details_container .profile_details:contains("Streak") .profile_details_value')
        .text()
        .trim()

      if (streakText) {
        profileData.streak = Number.parseInt(streakText, 10) || 0
      }
    } catch (e) {
      console.error("Error parsing streak:", e)
    }

    // Extract heatmap data
    try {
      const heatmapScript = $('script:contains("var heatmap_data")').html() || ""
      const heatmapMatch = heatmapScript.match(/var heatmap_data = (\[.*?\]);/s)

      if (heatmapMatch && heatmapMatch[1]) {
        // Clean the JSON string and parse it
        const cleanedJson = heatmapMatch[1].replace(/'/g, '"')
        const heatmapData = JSON.parse(cleanedJson)

        // Transform the data to our format
        profileData.heatmap = heatmapData.map((item: any) => ({
          date: item.date,
          count: item.count,
        }))
      }
    } catch (e) {
      console.error("Error parsing heatmap data:", e)
    }

    // Extract difficulty levels
    try {
      $(".difficulty-breakup-container .difficulty-breakup").each((i, el) => {
        const difficultyName = $(el).find(".difficulty-breakup-heading").text().trim()
        const count = Number.parseInt($(el).find(".difficulty-breakup-value").text().trim() || "0", 10)

        if (count > 0) {
          if (difficultyName.includes("Easy")) {
            profileData.problemsSolved.difficulties[0].count = count
            profileData.problemsSolved.difficulties[0].total = count
          } else if (difficultyName.includes("Medium")) {
            profileData.problemsSolved.difficulties[1].count = count
            profileData.problemsSolved.difficulties[1].total = count
          } else if (difficultyName.includes("Hard")) {
            profileData.problemsSolved.difficulties[2].count = count
            profileData.problemsSolved.difficulties[2].total = count
          }
        }
      })
    } catch (e) {
      console.error("Error parsing difficulty levels:", e)
    }

    // Get recent problems (if available)
    const recentProblems: any[] = []
    try {
      $(".recent-problems-container .recent-problem").each((i, el) => {
        if (recentProblems.length < 5) {
          const problemName = $(el).find(".recent-problem-name").text().trim()
          const difficulty = $(el).find(".recent-problem-difficulty").text().trim()
          const timeAgo = $(el).find(".recent-problem-time").text().trim()

          recentProblems.push({
            name: problemName || "Unknown Problem",
            difficulty: difficulty || "Medium",
            timeAgo: timeAgo || "Recently",
            platform: "GeeksforGeeks",
          })
        }
      })
    } catch (e) {
      console.error("Error parsing recent problems:", e)
    }

    return NextResponse.json({
      success: true,
      data: profileData,
      recentProblems,
    })
  } catch (err: any) {
    console.error("Error:", err.message)
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Something went wrong",
        data: {
          username: username,
          problemsSolved: {
            total: 85, // Default value you mentioned
            categories: [
              {
                name: "Fundamentals",
                count: 0,
                total: 0,
                color: "from-green-500 to-emerald-600",
              },
              {
                name: "DSA",
                count: 85, // Default value you mentioned
                total: 85, // Default value you mentioned
                color: "from-yellow-500 to-amber-600",
              },
            ],
            difficulties: [
              {
                name: "Easy",
                count: 40, // Estimated distribution
                total: 40,
                color: "text-green-500",
              },
              {
                name: "Medium",
                count: 35, // Estimated distribution
                total: 35,
                color: "text-yellow-500",
              },
              {
                name: "Hard",
                count: 10, // Estimated distribution
                total: 10,
                color: "text-red-500",
              },
            ],
          },
          activeDays: 0,
          streak: 0,
          heatmap: [],
        },
        recentProblems: [],
      },
      { status: 500 },
    )
  }
}
