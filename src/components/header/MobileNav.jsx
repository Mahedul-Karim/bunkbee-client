import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";
import { NAV_LINKS } from "@/lib/data";
import { useStore } from "@/store/Provider";

const MobileNav = () => {
  const { pathname } = useLocation();

  const { user } = useStore()

  return (
    <Sheet>
      <SheetTrigger>
        <AlignRight className="text-dark" />
      </SheetTrigger>
      <SheetContent className={"border-l-border overflow-auto"}>
        <SheetHeader>
          <SheetTitle
            className={
              "flex items-center justify-center border-b border-border pb-2"
            }
          >
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <nav className="px-4">
          <ul className="flex flex-col gap-4" id="nav-container">
            {NAV_LINKS?.map((nav, i) => (
              <li key={i}>
                <SheetClose asChild>
                  <Link
                    to={nav.to}
                    className={`flex items-center gap-2  px-2 rounded-md h-10 font-medium border  ${
                      pathname === nav.to
                        ? "border-primary text-primary"
                        : "border-transparent text-dark"
                    }`}
                  >
                    {nav.icon}
                    {nav.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter>
          {!user && <SheetClose asChild>
            <Button asChild className={"font-semibold"}>
              <Link to={"/login"}>Join Us</Link>
            </Button>
          </SheetClose>}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
