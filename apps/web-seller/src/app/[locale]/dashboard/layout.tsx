"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  CreditCard,
  Bell,
  MessageSquare,
  Menu,
} from "lucide-react";
import { Button } from "@seller/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@seller/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@seller/components/ui/avatar";
import { Link } from "@seller/i18n/navigation";
import LocaleSwitcher from "@seller/components/(lang)/LocaleSwitcher";
import { ModeToggle } from "@seller/components/theme/ModeToggle";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package }, // Links to Catalog Service [cite: 52]
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/finance", label: "Finance", icon: CreditCard }, // Links to Payouts
  { href: "/dashboard/settings", label: "Store Settings", icon: Settings }, // Links to Seller Profile [cite: 48]
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen container mx-auto ">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r  md:block">
        <div className="flex h-16 items-center border-b px-6 font-bold text-green-600 text-xl">
          Muuza Seller
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* Mobile Nav Content (Same as Desktop) */}
                <div className="p-4">
                  <div className="mb-6 font-bold text-green-600 text-xl">
                    Muuza Seller
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 mb-1"
                      >
                        <item.icon className="h-4 w-4" /> {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold md:hidden">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <LocaleSwitcher />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>SE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
