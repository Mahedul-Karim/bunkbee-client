import React from "react";
import Logo from "./Logo";
import { Instagram, Twitter, Facebook, Linkedin, Github } from "lucide-react";
import { Link } from "react-router";
import { NAV_LINKS } from "@/lib/data";

const Footer = () => {
  return (
    <footer className={`pt-8 md:pt-16  bg-background`}>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 l-container">
        <div>
          <Logo />
          <p className="text-sm leading-[1.5] text-muted/80 my-2 max-w-[250px]">
            Managing a hostel can be complex, but it doesn't have to be. We're
            here to help you run your hostel smoothly and efficiently, every
            single day.
          </p>
        </div>
        <div>
          <h3 className="text-dark font-semibold mb-4">Company</h3>
          <ul className="flex flex-col gap-4">
            {NAV_LINKS?.map((nav, i) => (
              <li key={i}>
                <Link to={nav.to} className="text-muted/80 text-sm">
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-dark font-semibold mb-4">Contact Us</h3>
          <div className="flex space-x-4">
            <Link
              to="https://www.facebook.com"
              target="_blank"
              className="text-muted/80"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              className="text-muted/80"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              to="https://www.x.com"
              target="_blank"
              className="text-muted/80"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              to="https://www.linkedin.com"
              target="_blank"
              className="text-muted/80"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              to="https://www.github.com"
              target="_blank"
              className="text-muted/80"
            >
              <Github className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
      <section className="border-t border-border text-center text-muted/80 mt-8 pb-4 l-container">
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()}, bunkbee
        </p>
      </section>
    </footer>
  );
};

export default Footer;
