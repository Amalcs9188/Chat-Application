"use client";
import AnimatedDivDown from "@src/components/animated_components/AnimatedDivDown";
import { AppSidebar } from "@src/components/appsidebar_components/app-sidebar";
import { ChatInterface } from "@src/components/Chat/ChatInterface";
import BellNotification from "@src/components/header_components/BellNotification";
import HomeButton from "@src/components/header_components/HomeButton";
import Navbar from "@src/components/header_components/Navbar";
import ProfileComponent from "@src/components/header_components/ProfileComponent";
import SidebarToggle from "@src/components/header_components/SidebarToggle";
import { ThemeSwitch } from "@src/components/header_components/ThemeToggleBtn";
import { SidebarProvider } from "@src/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { paginationStore } from "../stores/paginationStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const resetOffset = paginationStore((state) => state.resetOffset);
  const setLimit = paginationStore((state) => state.setLimit);
  const setSearchTerm = paginationStore((state) => state.setSearchTerm);

  useEffect(() => {
    resetOffset();
    setLimit(10);
    setSearchTerm("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    //<SidebarProvider>
    //   <AppSidebar />
    //   <main>
    //     <SidebarTrigger />
    //     {children}
    //   </main>
    // </SidebarProvider>
    <div className="flex h-screen w-full">
      <SidebarProvider className="w-full flex pr-4">
        <AppSidebar />
        <div className="  flex w-full flex-col min-w-0 py-3 ">
          <AnimatedDivDown className="flex w-full gap-2 items-center justify-between">
            <SidebarToggle />
            <HomeButton />
            <Navbar />
            <ThemeSwitch />
            <BellNotification />
            <ProfileComponent />
            <ChatInterface />
          </AnimatedDivDown>
          <main className="flex-1 h-full rounded-2xl mt-[10px] max-w-full min-w-0 overflow-y-auto scroll overflow-x-hidden">
            <Toaster position="top-right" richColors />
            <div className="rounded-2xl main_height ">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
