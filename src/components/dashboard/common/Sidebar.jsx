import Logo from "@/components/common/Logo";
import SheetCloseWrapper from "@/components/common/SheetCloseWrapper";
import React from "react";
import { Link, useLocation } from "react-router";

export const Sidebar = ({ links = [], closeOnClick = false }) => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="my-4 border-t border-dashed border-border" />
      <nav>
        <ul className="flex flex-col gap-2">
          {links?.map((link, i) => (
            <li key={i}>
              <SheetCloseWrapper closeOnClick={closeOnClick}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-2 py-3 rounded-md px-4 ${
                    pathname === link.to
                      ? "bg-primary text-white"
                      : "bg-transparent text-muted"
                  } transition-colors duration-300 hover:bg-primary hover:text-white`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </SheetCloseWrapper>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
