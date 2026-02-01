import { useState } from "react";
import { Menu, Home, Radio, Image, Video, BarChart3, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarControls } from "@/components/controls/SidebarControls";

const navItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Realtime Detection", path: "/realtime-detection", icon: Radio },
  { title: "Image Detection", path: "/image-detection", icon: Image },
  { title: "Video Detection", path: "/video-detection", icon: Video },
  { title: "Asset Intelligence and Planning", path: "/asset-intelligence", icon: BarChart3 },
];

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isAssetIntelligencePage = location.pathname === "/asset-intelligence";

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild >
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6 " />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col overflow-auto ">
        {/* Navigation */}
        <nav className="pt-12 px-3 space-y-1 ">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "nav-link",
                  isActive && "active"
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Controls - Only show on Asset Intelligence page */}
        {isAssetIntelligencePage && <SidebarControls />}

        {/* Spacer */}
        <div className="flex-1" />

        {/* User section */}
        {user && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.user_metadata?.full_name || "مستخدم"}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                signOut();
                setOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 ml-2" />
              Logout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
