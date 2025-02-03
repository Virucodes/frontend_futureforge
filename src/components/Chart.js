import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// Color palette for different portions
const colors = ["#FF5733", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FF2F40", "#8A2BE2", "#7FFF00", "#D2691E"];

const Chart = ({ type, chartData }) => {
  const [chartConfig, setChartConfig] = useState(null);

  useEffect(() => {
    if (type === "column") {
      const summaries = chartData.map((item) => item.summary);

      const summaryData = summaries.map((summary, index) => {
        const [skill, level] = summary.split(" : ");
        let levelValue = 0;
        if (level === "Beginner") {
          levelValue = 1;
        } else if (level === "Intermediate") {
          levelValue = 2;
        } else if (level === "Advanced") {
          levelValue = 3;
        } else if (level === "Expert") {
          levelValue = 4;
        }

        return { skill, level: levelValue, color: colors[index % colors.length] }; // Assign a color based on index
      });

      setChartConfig(summaryData);
    }

    if (type === "pie") {
      const summaries = chartData.map((item) => item.summary.split(",")).flat();

      const summaryData = summaries.map((summary, index) => {
        const [skill, level] = summary.split(":");
        const trimmedSkill = skill ? skill.trim() : "Unknown Skill";
        const trimmedLevel = level ? parseInt(level.trim()) : 0;

        return { name: trimmedSkill, value: trimmedLevel, color: colors[index % colors.length] }; // Assign a color based on index
      });

      setChartConfig(summaryData);
    }
  }, [chartData, type]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {type === "column" && chartConfig && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartConfig}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartConfig.map((entry, index) => (
              <Bar key={index} dataKey="level" fill={entry.color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}

      {type === "pie" && chartConfig && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartConfig}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
              isAnimationActive={false}
            >
              {chartConfig.map((entry, index) => (
                <Cell key={index} fill={entry.color} /> // Apply a unique color to each slice
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
