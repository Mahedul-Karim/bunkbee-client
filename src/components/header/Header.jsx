import React from "react";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Bell } from "lucide-react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { useStore } from "@/store/Provider";
import User from "../common/User";

const Header = () => {
  const { user } = useStore();

  return (
    <header className="sticky top-0 w-full z-[2] bg-white">
      <section className="l-container py-4 flex items-center justify-between">
        <Logo />
        <Nav />
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className={"text-dark hover:bg-muted/10"}>
            <Bell className="size-5" />
          </Button>
          {user ? (
            <User />
          ) : (
            <Button asChild className={"font-semibold"}>
              <Link to={"/login"}>Join Us</Link>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {user && <User />}
          <MobileNav />
        </div>
      </section>
    </header>
  );
};

export default Header;
