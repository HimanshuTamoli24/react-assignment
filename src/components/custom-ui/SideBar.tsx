"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  Search,
  Info,
  Github,
  Menu as MenuIcon,
  X as CloseIcon,
  Settings,
  SquareChevronRightIcon,
  CircleAlert,
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "GitHub", href: "https://github.com/HimanshuTamoli24", icon: Github },
    { name: "My Girlfreind", href: "https://www.amazon.in/Mom-Says-Girlfriend-Subhasis-Das/dp/8129117037", icon: CircleAlert },
  ];

  return (
    <>
      {/* Hamburger button for small screens */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black/10"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Sidebar overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed sm:static top-0 left-0 z-50 h-full min-h-screen w-64 border-r bg-white p-4 shadow-md transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        {/* Close button on small screens */}
        <div className="flex items-center justify-between mb-8 border-b pb-2">
          <span className="text-2xl font-bold italic">Sidebar</span>
          <button className="" onClick={() => setIsOpen(false)}>
            <CloseIcon className="w-5 h-5 sm:hidden" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExternal = item.name === "GitHub" || item.name === "My Girlfreind";

            return (
              <Link
                key={item.name}
                href={item.href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined} // secure external links
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5"
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}

        </nav>
      </aside>
    </>
  );
}

export default SideBar;
