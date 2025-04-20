"use client";

import { useEffect, useState } from "react";

interface Day {
  date: string;
  count: number;
}

interface HeatMapProps {
  days: Day[];
}

export function HeatMap({ days = [] }: HeatMapProps) {
  const [processedDays, setProcessedDays] = useState<Day[]>([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    // If no days provided, generate 6 months of empty data
    if (days.length === 0) {
      const generateEmptyData = () => {
        const data: Day[] = [];
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);

        for (
          let d = new Date(sixMonthsAgo);
          d <= today;
          d.setDate(d.getDate() + 1)
        ) {
          data.push({
            date: d.toISOString().split("T")[0],
            count: 0,
          });
        }

        return data;
      };

      setProcessedDays(generateEmptyData());
    } else {
      // Process the provided days
      // Ensure days are sorted by date
      const sortedDays = [...days].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Fill in any missing days in the range
      const filledDays: Day[] = [];
      if (sortedDays.length > 0) {
        const startDate = new Date(sortedDays[0].date);
        const endDate = new Date(sortedDays[sortedDays.length - 1].date);

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const dateStr = d.toISOString().split("T")[0];
          const existingDay = sortedDays.find((day) => day.date === dateStr);

          filledDays.push({
            date: dateStr,
            count: existingDay ? existingDay.count : 0,
          });
        }
      }

      setProcessedDays(filledDays);
    }
  }, [days]);

  // Get the intensity of the color based on count
  const getColor = (count: number) => {
    if (count === 0) return "bg-[#161b22]";
    if (count === 1) return "bg-[#0e4429]";
    if (count === 2) return "bg-[#006d32]";
    if (count === 3) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  // Group days by week for display
  const weeks = () => {
    const result = [];
    let week: Day[] = [];

    if (processedDays.length === 0) return [];

    // Find the first Sunday to start
    const firstDay = new Date(processedDays[0]?.date);

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      week.push({ date: "", count: -1 });
    }

    for (const day of processedDays) {
      const date = new Date(day.date);
      week.push(day);

      // If it's Saturday or the last day, start a new week
      if (
        date.getDay() === 6 ||
        day === processedDays[processedDays.length - 1]
      ) {
        result.push(week);
        week = [];
      }
    }

    return result;
  };

  // Get month labels
  const monthLabels = () => {
    const labels = [];

    if (processedDays.length === 0) return [];

    const firstDay = new Date(processedDays[0]?.date);
    const lastDay = new Date(processedDays[processedDays.length - 1]?.date);

    for (
      let month = firstDay.getMonth();
      month <=
      lastDay.getMonth() +
        (lastDay.getFullYear() - firstDay.getFullYear()) * 12;
      month++
    ) {
      const actualMonth = month % 12;
      labels.push({
        month: months[actualMonth],
        index: month - firstDay.getMonth(),
      });
    }

    return labels;
  };

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
                    className={`w-3 h-3 rounded-sm ${
                      day.count >= 0 ? getColor(day.count) : "bg-transparent"
                    } hover:ring-1 hover:ring-blue-400 transition-all`}
                    title={
                      day.date ? `${day.date}: ${day.count} submissions` : ""
                    }
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
  );
}
