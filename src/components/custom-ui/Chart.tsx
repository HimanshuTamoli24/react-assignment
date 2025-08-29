// Chart.tsx
"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";

const chartConfig = {
    price: { label: "Price", color: "var(--chart-1)" },
    rating: { label: "Rating", color: "var(--chart-2)" },
} satisfies ChartConfig;

export interface ProductChartData {
    title: string;
    price: number;
    rating: number;
}

interface GradientRoundedAreaChartProps {
    chartData: ProductChartData[];
}

export function GradientRoundedAreaChart({ chartData }: GradientRoundedAreaChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Product Price vs Rating
                    <Badge variant="outline" className="text-red-500 bg-red-500/10 border-none ml-2">
                        <TrendingDown className="h-4 w-4" />
                        <span>-5.2%</span>
                    </Badge>
                </CardTitle>
                <CardDescription>Showing price and rating of all products</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart accessibilityLayer data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="title"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="gradient-price" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="gradient-rating" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-rating)" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="var(--color-rating)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area dataKey="rating" type="natural" fill="url(#gradient-rating)" stroke="var(--color-rating)" stackId="a" strokeWidth={0.8} />
                        <Area dataKey="price" type="natural" fill="url(#gradient-price)" stroke="var(--color-price)" stackId="a" strokeWidth={0.8} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

// Dotted Chart
interface DottedChartData {
    label: string;
    value1: number;
    value2: number;
}

interface DottedMultiLineChartProps {
    data: DottedChartData[];
    title: string;
    description?: string;
    value1Label?: string;
    value2Label?: string;
}

export function DottedMultiLineChart({ data, title, description, value1Label = "Value 1", value2Label = "Value 2" }: DottedMultiLineChartProps) {
    const chartConfig = {
        value1: { label: value1Label, color: "var(--chart-2)" },
        value2: { label: value2Label, color: "var(--chart-5)" },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                    <Badge variant="outline" className="text-red-500 bg-red-500/10 border-none ml-2">
                        <TrendingDown className="h-4 w-4" />
                        <span>-5.2%</span>
                    </Badge>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(val) => String(val).slice(0, 10)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line dataKey="value1" type="linear" stroke="var(--color-value1)" dot={false} strokeDasharray="4 4" />
                        <Line dataKey="value2" type="linear" stroke="var(--color-value2)" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
