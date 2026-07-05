"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FrequencyEntry } from "@/lib/analytics";
import { useLang } from "./LanguageProvider";

export default function FrequencyChart({ data }: { data: FrequencyEntry[] }) {
  const { t } = useLang();
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
          <XAxis
            dataKey="number"
            tick={{ fontSize: 10, fill: "#BCE9D2" }}
            interval={data.length > 40 ? 3 : 1}
            axisLine={{ stroke: "#1C8A5A" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#BCE9D2" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip
            cursor={{ fill: "rgba(212,175,55,0.1)" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #1C8A5A",
              background: "#0F7048",
              boxShadow: "0 8px 20px -8px rgba(0,0,0,0.5)",
              fontSize: 12,
              color: "#FFFFFF",
            }}
            labelFormatter={(v) => t("chart.numberLabel", { n: v })}
            formatter={(value: number) => [`${value} ${t("chart.draws")}`, t("chart.appeared")]}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.number}
                fill={entry.count === maxCount ? "#D4AF37" : "#1C8A5A"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
