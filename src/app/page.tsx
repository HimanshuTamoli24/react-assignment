"use client"
import Table from "@/components/custom-ui/Main"
import { getProducts } from "@/utils/api/apis";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts(5, 0);
        console.log("Products:", data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="border">
        <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
        <Table />
      </div>
    </div>
  );
}
