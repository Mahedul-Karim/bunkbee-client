import React from "react";
import { Link, useRouteError } from "react-router";
import Header from "../header/Header";
import Footer from "../common/Footer";
import { Button } from "../ui/button";

const NotFound = () => {
  const error = useRouteError();

  return (
    <>
      <Header />
      <section className="py-10 l-container">
        <div className="flex items-center justify-center">
          <img src="/not-found.svg" alt="" className="max-h-[350px]" />
        </div>
        <p className="my-4 text-center text-muted text-sm xs:text-base">
          {error?.message ||
            "Oops! The page you're looking for might be under construction or doesn't exist."}
        </p>
        <div className="flex items-center justify-center">
          <Button asChild className={"rounded-full font-semibold"}>
            <Link to={"/"}>Back to Home</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
