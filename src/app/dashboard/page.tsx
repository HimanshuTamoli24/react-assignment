"use client";

import { DottedMultiLineChart, GradientRoundedAreaChart } from "@/components/custom-ui/Chart";
import { useProductStore } from "@/store/products";
import React from "react";
    

function DashboardPage() {
    const products = useProductStore((state) => state.products);

    // Transform products for charts
    const chartData = products.map((p) => ({
        title: p.title,
        price: p.price,
        rating: p.rating,
    }));

    const dottedChartData = products.map((p) => ({
        label: String(p.brand ?? "Unknown"), 
        value1: Number(p.discountPercentage ?? 0), 
        value2: Number(p.stock ?? 0), 
    }));

    // Calculate some quick stats
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const avgPrice = (products.reduce((acc, p) => acc + p.price, 0) / totalProducts).toFixed(2);

    return (
        <div className="w-full min-h-screen p-6 space-y-6">
            {/* Dashboard Header / Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold italic">Dashboard</h1>
                <p className="text-gray-600">
                    Welcome! Here’s a quick overview of your products and stats.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-xl font-semibold">{totalProducts}</p>
                </div>
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-sm text-gray-500">Total Stock</p>
                    <p className="text-xl font-semibold">{totalStock}</p>
                </div>
                <div className="p-4 bg-white shadow rounded-lg">
                    <p className="text-sm text-gray-500">Average Price</p>
                    <p className="text-xl font-semibold">${avgPrice}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="flex flex-col lg:flex-row w-full gap-4">
                <div className="flex-1">
                    <GradientRoundedAreaChart chartData={chartData} />
                </div>
                <div className="flex-1">
                    <DottedMultiLineChart
                        data={dottedChartData}
                        title="Brand Discount vs Stock"
                        description="Shows discount percentage and stock quantity for each brand"
                        value1Label="Discount %"
                        value2Label="Stock"
                    />

                </div>
            </div>

            <p className="text-gray-600 text-sm"> for more details analysics hire me {"  "}
                <span className="text-emerald-700 underline">
                    <a  target="_blank" href="mailto:himanshutamoli2005@gmail.com">himanshutamoli2005@gmail.com</a> 
                </span>😉</p>
        </div>
    );
}

export default DashboardPage;
