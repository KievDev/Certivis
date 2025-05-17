"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();

  // state for the Sheet menu
  const [isOpen, setIsOpen] = useState(false);

  // Array for the Sheet menu
  const navItems = [{ href: "#professionals", label: "Profissionais" }];

  // Function to login
  async function handleLogin() {
    await handleRegister("github");
  }

  // Function for the Sheet menu utilizing the array above
  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none"
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <></>
      ) : session ? ( // if the user is logged in
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-md"
        >
          Painel da clínica
        </Link>
      ) : (
        // if the user is not logged in
        <Button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-md"
        >
          <LogIn />
          Login
        </Button>
      )}
    </>
  );
  //

  return (
    <header
      className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white" // fixed top-0 right-0 left-0 = fixes the header to the top of the page and spans the width of the screen
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900 select-none">
          Certi
          <span className="text-emerald-500 select-none">vis</span>
        </Link>
        <nav
          className="hidden md:flex items-center space-x-4" // hidden md:flex = hides the navigation links on small screens, space-x-4 = sets the space between the navigation links to 4px
        >
          <NavLinks />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            asChild
            className="md:hidden" // md:hidden = hides the navigation links on large screens
          >
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]" // w-[240px] = sets the width to 240px, sm:w-[300px] = sets the width to 300px on small screens
          >
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription>Links</SheetDescription>
            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
