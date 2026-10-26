"use client";

import { Logo } from "@/components";
import { useNavbarScroll, useMobileMenu } from "./hooks";
import { DesktopNav, MobileMenu, MobileMenuButton } from "./components";

export function Navbar() {
  const { isOpen, toggle, close } = useMobileMenu();
  const { scrolled } = useNavbarScroll();

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 mx-auto max-w-[1280px] transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo className="text-white" />
          <DesktopNav />
          <MobileMenuButton isOpen={isOpen} onClick={toggle} />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={close} />
    </header>
  );
}
