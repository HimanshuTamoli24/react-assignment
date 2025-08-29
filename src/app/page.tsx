"use client"
import Table from "@/components/custom-ui/Main"
import SideBar from "@/components/custom-ui/SideBar";
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
    <div className="min-h-screen   ">

      <Navbar />
      <Table />

    </div>
  );
}
import Link from "next/link";
import { Github, LayoutDashboardIcon, Linkedin, ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full bg-white  rounded-2xl  sticky top-0 border  px-6 py-3 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-xl font-bold flex items-center gap-2 text-gray-800">

        <LayoutDashboardIcon />
        <span>React</span>

      </div>

      {/* Social Links */}
      <div className="flex items-center space-x-4">
        <Link
          href="https://github.com/HimanshuTamoli24"
          target="_blank"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
        >
          <Github className="w-5 h-5" />

        </Link>

        <Link
          href="https://www.linkedin.com/in/himanshutamoli24"
          target="_blank"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
        >
          <Linkedin className="w-5 h-5" />

        </Link>
      </div>
    </nav>
  );
}
