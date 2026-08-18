"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactNode } from "react";
import { formatNumber } from "@/lib/utils";

const axisStyle = {
  fontSize: 11,
  fill: "#7c7c88",
  fontFamily: "var(--font-inter)",
} as const;

function TooltipCard({
  title,
  rows,
}: {
  title: ReactNode;
  rows: Array<{ label: string; value: ReactNode; color?: string }>;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white/95 px-3 py-2.5 shadow-[0_16px_40px_-18px_rgba(8,8,10,0.35)] backdrop-blur">
      <p className="text-[11px] font-medium text-ink-400">{title}</p>
      <div className="mt-1.5 space-y-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2.5 text-[12.5px]">
            {r.color && (
              <span
                className="size-2 rounded-full"
                style={{ background: r.color }}
              />
            )}
            <span className="text-ink-400">{r.label}</span>
            <span className="tnum ml-auto font-medium text-ink-950">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Interacțiuni — scanări vs feedback                                        */
/* -------------------------------------------------------------------------- */

export function InteractionsChart({
  data,
  height = 260,
}: {
  data: Array<{ label: string; scanari: number; feedback: number }>;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="gradScan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bd9147" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#bd9147" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradFb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3a43" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#3a3a43" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#ebe6dc"
            strokeDasharray="0"
            strokeWidth={1}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            interval="preserveStartEnd"
            minTickGap={28}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            width={44}
            tickCount={5}
          />
          <Tooltip
            cursor={{ stroke: "#c9c9d1", strokeWidth: 1, strokeDasharray: "3 3" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipCard
                  title={label as string}
                  rows={[
                    {
                      label: "Scanări",
                      value: formatNumber(Number(payload[0]?.value ?? 0)),
                      color: "#bd9147",
                    },
                    {
                      label: "Feedback",
                      value: formatNumber(Number(payload[1]?.value ?? 0)),
                      color: "#3a3a43",
                    },
                  ]}
                />
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="scanari"
            stroke="#bd9147"
            strokeWidth={2}
            fill="url(#gradScan)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#bd9147" }}
            animationDuration={1100}
          />
          <Area
            type="monotone"
            dataKey="feedback"
            stroke="#3a3a43"
            strokeWidth={1.75}
            fill="url(#gradFb)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#3a3a43" }}
            animationDuration={1300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Donut — motive de nemulțumire                                             */
/* -------------------------------------------------------------------------- */

export function ReasonsDonut({
  data,
  height = 200,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <TooltipCard
                  title="Motiv"
                  rows={[
                    {
                      label: String(payload[0]?.name),
                      value: `${payload[0]?.value}%`,
                      color: payload[0]?.payload?.color,
                    },
                  ]}
                />
              ) : null
            }
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="93%"
            paddingAngle={2.5}
            stroke="none"
            animationDuration={1100}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bare — scanări pe oră                                                     */
/* -------------------------------------------------------------------------- */

export function HourlyBars({
  data,
  height = 220,
}: {
  data: Array<{ hour: string; value: number }>;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -22 }}>
          <CartesianGrid
            vertical={false}
            stroke="#ebe6dc"
            strokeDasharray="0"
            strokeWidth={1}
          />
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            dy={6}
            interval={1}
          />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={44} />
          <Tooltip
            cursor={{ fill: "rgba(8,8,10,0.035)" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipCard
                  title={`Ora ${label}:00`}
                  rows={[
                    {
                      label: "Scanări",
                      value: formatNumber(Number(payload[0]?.value ?? 0)),
                      color: "#bd9147",
                    },
                  ]}
                />
              ) : null
            }
          />
          <Bar dataKey="value" radius={[5, 5, 3, 3]} animationDuration={1000}>
            {data.map((d) => (
              <Cell
                key={d.hour}
                fill={d.value > max * 0.75 ? "#bd9147" : "#d9d5cd"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sparkline                                                                 */
/* -------------------------------------------------------------------------- */

export function Sparkline({
  data,
  color = "#bd9147",
  height = 40,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.75}
            dot={false}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MRR — arie simplă                                                         */
/* -------------------------------------------------------------------------- */

export function MrrChart({
  data,
  height = 240,
}: {
  data: Array<{ month: string; value: number }>;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -6 }}>
          <defs>
            <linearGradient id="gradMrr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bd9147" stopOpacity={0.26} />
              <stop offset="100%" stopColor="#bd9147" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#ebe6dc"
            strokeDasharray="0"
            strokeWidth={1}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={axisStyle}
            width={54}
            tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
          />
          <Tooltip
            cursor={{ stroke: "#c9c9d1", strokeWidth: 1, strokeDasharray: "3 3" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipCard
                  title={label as string}
                  rows={[
                    {
                      label: "MRR",
                      value: `${formatNumber(Number(payload[0]?.value ?? 0))} lei`,
                      color: "#bd9147",
                    },
                  ]}
                />
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#bd9147"
            strokeWidth={2}
            fill="url(#gradMrr)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#bd9147" }}
            animationDuration={1100}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
