import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

const Banner = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const searchRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline();

    const splittedHeading = SplitText.create(headingRef.current, {
      type: "words",
      mask: "words",
    });
    const splittedParagraph = SplitText.create(paraRef.current, {
      type: "lines",
      mask: "lines",
    });

    timeline.from(splittedHeading.words, {
      y: 50,
      stagger: {
        each: 0.3,
      },
      duration: 0.6,
    });

    timeline.from(splittedParagraph.lines, {
      y: 50,
      stagger: {
        each: 0.3,
      },
      duration: 0.6,
    });

    timeline.to(searchRef.current, {
      width: "100%",
      opacity:1,
      duration: 1,
    });
  }, []);

  return (
    <section className="l-container mt-4 bg-[url('/banner.avif')] bg-cover bg-no-repeat bg-center min-h-[400px] sm:min-h-[500px] rounded-2xl relative z-[1] overflow-clip px-4 sm:px-10 grid">
      <div className="absolute inset-0 bg-black/60 -z-1"></div>
      <div className="flex flex-col gap-4 justify-center">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-[450px] leading-[1.2]"
          ref={headingRef}
        >
          Streamline Your Hostel Meal Experience
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-[510px]" ref={paraRef}>
          A complete system for students to view and review meals, and for
          admins to manage meals and student data with ease.
        </p>
        <div
          className="max-w-[450px] mt-4 flex items-center rounded-full h-10 sm:h-12 bg-white w-0 opacity-0"
          ref={searchRef}
        >
          <div className="flex items-center grow pl-4">
            <SearchIcon />
            <Input
              type="text"
              className="placeholder:text-muted placeholder:text-sm placeholder:font-normal text-dark font-medium bg-transparent border-none shadow-none sm:!text-base"
              placeholder="Search here"
            />
          </div>
          <Button
            type="submit"
            className="font-semibold h-10 sm:h-12 sm:text-base rounded-full sm:px-8 sm:-mr-4"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
