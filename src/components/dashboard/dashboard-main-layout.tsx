"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  FolderTree,
  LayoutDashboard,
  Menu,
  Package,
  TrendingUpIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "../auth/logout-button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 bg-background border-b border-border text-foreground h-16 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
        <Image
          src="/images/logo.png"
          alt="سنيوريتا"
          width={100}
          height={40}
          className="h-8 w-auto mx-auto"
        />
      </header>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-screen w-64 bg-background border-l border-border transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-border">
            <Link href="/dashboard">
              <Image
                src="/images/logo.png"
                alt="سنيوريتا"
                width={120}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-cream hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" asChild>
              <Link
                href="/"
                className="block text-center text-sm text-muted-foreground hover:text-primary mb-4"
              >
                <TrendingUpIcon />
                زيارة الموقع
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </aside>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <main className="lg:mr-64 pt-16 lg:pt-0 min-h-screen">
        <div className="w-full max-w-7xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "لوحة التحكم" },
  { href: "/dashboard/products", icon: Package, label: "المنتجات" },
  { href: "/dashboard/categories", icon: FolderTree, label: "الأقسام" },
];
