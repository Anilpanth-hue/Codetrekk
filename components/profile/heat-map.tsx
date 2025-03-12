"use client"

import { useEffect, useState } from "react"

interface Day {
  date: string
  count: number
}

export function HeatMap() {
  const [days, setDays] = useState<Day[]>([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  useEffect(() => {
    // Generate 6 months of data
    const generateData = () => {
      const data: Day[] = []
      const today = new Date()
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(today.getMonth() - 6)

      for (let d = new Date(sixMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
        data.push({
          date: d.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 5), // 0-4 submissions per day
        })
      }

      return data
    }

    setDays(generateData())
  }, [])

  // Get the intensity of the color based on count
  const getColor = (count: number) => {
    if (count === 0) return "bg-[#161b22]"
    if (count === 1) return "bg-[#0e4429]"
    if (count === 2) return "bg-[#006d32]"
    if (count === 3) return "bg-[#26a641]"
    return "bg-[#39d353]"
  }

  // Group days by week for display
  const weeks = () => {
    const result = []
    let week: Day[] = []

    // Find the first Sunday to start
    const firstDay = new Date(days[0]?.date)
    const daysToAdd = (7 - firstDay.getDay()) % 7

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      week.push({ date: "", count: -1 })
    }

    for (const day of days) {
      const date = new Date(day.date)
      week.push(day)

      // If it's Saturday or the last day, start a new week
      if (date.getDay() === 6 || day === days[days.length - 1]) {
        result.push(week)
        week = []
      }
    }

    return result
  }

  // Get month labels
  const monthLabels = () => {
    const labels = []
    const firstDay = new Date(days[0]?.date)
    const lastDay = new Date(days[days.length - 1]?.date)

    for (
      let month = firstDay.getMonth();
      month <= lastDay.getMonth() + (lastDay.getFullYear() - firstDay.getFullYear()) * 12;
      month++
    ) {
      const actualMonth = month % 12
      labels.push({
        month: months[actualMonth],
        index: month - firstDay.getMonth(),
      })
    }

    return labels
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="flex mb-1">
          {monthLabels().map((label, i) => (
            <div
              key={i}
              className="text-xs text-gray-500"
              style={{
                marginLeft: i === 0 ? "20px" : "0",
                width: `${label.index === 0 ? "auto" : ""}`,
                paddingRight: "4px",
              }}
            >
              {label.month}
            </div>
          ))}
        </div>

        <div className="flex text-xs text-gray-500">
          <div className="flex flex-col justify-between h-[104px] pr-2">
            <span>Sun</span>
            <span>Tue</span>
            <span>Thu</span>
            <span>Sat</span>
          </div>

          <div className="flex gap-1">
            {weeks().map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${day.count >= 0 ? getColor(day.count) : "bg-transparent"} hover:ring-1 hover:ring-blue-400 transition-all`}
                    title={day.date ? `${day.date}: ${day.count} submissions` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
          <span className="mr-2">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#161b22]" />
            <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />
            <div className="w-3 h-3 rounded-sm bg-[#006d32]" />
            <div className="w-3 h-3 rounded-sm bg-[#26a641]" />
            <div className="w-3 h-3 rounded-sm bg-[#39d353]" />
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  )
}

