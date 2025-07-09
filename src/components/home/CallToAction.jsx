import React from "react";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="l-container py-8 md:py-16 grid md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center gap-4">
        <h3 className="font-bold text-dark text-2xl xs:text-3xl lg:text-4xl leading-[1.3]">
          Do you have any questions?
          <br /> We are available 24/7
        </h3>
        <div>
          <Button className="h-10 px-8 font-semibold uppercase rounded-full">
            Get in Touch
          </Button>
        </div>
      </div>
      <div>
        <img
          src="/contact.png"
          className="max-h-[350px] md:max-h-[500px] w-full object-contain"
          alt=""
        />
      </div>
    </section>
  );
};

export default CallToAction;
