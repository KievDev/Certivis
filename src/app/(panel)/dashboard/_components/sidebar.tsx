// SIDEBAR COMPONENT FOR LOGGED IN PAGES //

"use client";
import React from "react"; // imports
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../../public/logo.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SidebarDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current pathname
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse status

  return (
    <div className="flex min-h-screen w-full">
      <aside // Sidebar component for desktop
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          <Image src={logoImg} alt="Logo Certivis" priority quality={100} />
        </div>
        <Button
          className="bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-12 h-12" />
          ) : (
            <ChevronLeft className="w-12 h-12" />
          )}
        </Button>

        {isCollapsed && ( // Conditional rendering based on sidebar collapse status which will only show the sidebar icons if the sidebar is collapsed
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
            <SidebarLink
              href="/dashboard"
              icon={<CalendarCheck2 className="w-6 h-6" />}
              label="Consultas"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/services"
              icon={<Folder className="w-6 h-6" />}
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/profile"
              icon={<Settings className="w-6 h-6" />}
              label="Meu perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/plans"
              icon={<Banknote className="w-6 h-6" />}
              label="Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Dashboard
              </span>
              <SidebarLink
                href="/dashboard"
                icon={<CalendarCheck2 className="w-6 h-6" />}
                label="Consultas"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/services"
                icon={<Folder className="w-6 h-6" />}
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Minha Conta
              </span>
              <SidebarLink
                href="/dashboard/profile"
                icon={<Settings className="w-6 h-6" />}
                label="Meu perfil"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/plans"
                icon={<Banknote className="w-6 h-6" />}
                label="Planos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>
      <div // Sidebar component for mobile
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed, // md:ml-20 = margin left 20 on medium screens, md:ml-64 = margin left 64 on medium screens
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden" // md:hidden = hidden on medium screens
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1
                className="text-base md:text-lg font-semibold" // md:text-lg = text size large on medium screens
              >
                Certivis Menu
              </h1>
            </div>
            <SheetContent
              side="left"
              className="sm:max-w-xs text-black" // sm:max-w-xs = max width 20 on small screens
            >
              <SheetTitle>Certivis</SheetTitle>
              <SheetDescription>Menu Admin</SheetDescription>
              <nav
                className="grid gap-2 text-base pt-5" // grid gap-2 = grid with gap 2, pt-5 = padding top 5
              >
                <SidebarLink
                  href="/dashboard"
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                  label="Consultas"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  icon={<Banknote className="w-6 h-6" />}
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  icon={<Settings className="w-6 h-6" />}
                  label="Meu perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/services"
                  icon={<Folder className="w-6 h-6" />}
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main
          className="flex-1 py-4 px-2 md:p-6" // py-4 = padding top and bottom 4, px-2 = padding left and right 2, md:p-6 = padding 6 on medium screens
        >
          {children}
        </main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "text-white bg-emerald-500 hover:bg-emerald-400": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
