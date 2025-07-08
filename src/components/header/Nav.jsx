import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { NAV_LINKS } from "@/lib/data";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <NavigationMenu viewport={false} className={"list-none"}>
        {NAV_LINKS?.map((nav, i) => (
          <NavigationMenuItem
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-dark  hover:after:w-5 after:transition-all after:duration-300 ${
              pathname === nav.to ? "after:w-5" : "after:w-0"
            }`}
            key={i}
          >
            <NavigationMenuLink
              asChild
              className={clsx(
                navigationMenuTriggerStyle(),
                "bg-transparent text-dark hover:bg-transparent pl-0 py-1 pr-6"
              )}
            >
              <Link to={nav.to}>{nav.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenu>
    </div>
  );
};

export default Nav;
