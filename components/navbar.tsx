import React from "react";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Logo from "./logo";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5">
      <Logo />
      <div className="flex gap-2">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
