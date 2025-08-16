import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import FeaturedMeals from "@/components/home/FeaturedMeals";
import Membership from "@/components/home/Membership";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedMeals />
      <Testimonials />
      <Membership />
      <CallToAction />
    </>
  );
};

export default Home;
