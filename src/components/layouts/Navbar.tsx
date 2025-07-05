import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router";
import { Button } from "../ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(mobileMenuOpen);
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "All Books", path: "/books" },
    { label: " Add Book", path: "/create-book" },
    { label: "Borrow Summery", path: "/borrow-summary" },
  ];
  return (
    <header>
      <div className="container mx-auto w-full py-5 flex justify-between items-center px-5 md:px-10 xl:px-0">
        <div className="flex justify-center items-center gap-x-1">
          <img
            src="/lib-logo.jpeg"
            alt="Library Management System Logo"
            className="w-12 h-8 hidden md:block"
          />
          <h1 className="text-2xl font-bold">BookFlow</h1>
        </div>

        {/* desktop nav */}
        <NavigationMenu className="lg:flex hidden">
          <NavigationMenuList className="flex justify-center items-center gap-x-5">
            {navLinks.map((navLink) => (
              <NavigationMenuItem key={navLink.path}>
                <NavigationMenuLink asChild className="text-xl">
                  <Link to={navLink.path}>{navLink.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* mobile nav */}
        <Button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 " />
        </Button>
      </div>

      {/* mobile sidebar */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className={"relative z-50 lg:hidden"}
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden={true} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white p-6 shadow-lg ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold"> Menu </h2>
            <Button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600"
              aria-label="CloseMenu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-lg font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;
