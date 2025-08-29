import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomQueryClientProvider } from "@/QueryClientProvider";
import SideBar from "@/components/custom-ui/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Demo with DummyJSON + React Query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomQueryClientProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Page content */}
            <main className="flex-1 p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
