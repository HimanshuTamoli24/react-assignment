"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  LayoutDashboard,
  Search,
  Info,
  Github,
  LayoutDashboardIcon,
} from "lucide-react"

function SideBar() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Search", href: "/search", icon: Search },
    { name: "About", href: "/about", icon: Info },
    { name: "GitHub", href: "https://github.com/HimanshuTamoli24", icon: Github },
  ]

  return (
    <aside className="min-h-screen w-64 border-r bg-white p-4 shadow-md">
      {/* Brand */}
      <div className="mb-8 text-2xl font-bold  flex items-center gap-2">
        <LayoutDashboardIcon/> 
        <span>React</span>
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.name === "GitHub" ? "_blank" : "_self"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 "
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default SideBar
