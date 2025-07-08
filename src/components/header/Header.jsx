import React from "react";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Bell } from "lucide-react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <section className="l-container py-4 flex items-center justify-between">
        <Logo />
        <Nav />
        <div className="flex items-center gap-4">
          <Button variant="ghost" className={'text-dark hover:bg-muted/10'}>
            <Bell className="size-5" />
          </Button>
          <Button asChild className={"font-semibold"}>
            <Link to={"/login"}>Join Us</Link>
          </Button>
        </div>
      </section>
    </header>
  );
};

export default Header;
