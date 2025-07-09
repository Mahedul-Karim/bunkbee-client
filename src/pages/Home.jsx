import Banner from "@/components/home/Banner";
import FeaturedMeals from "@/components/home/FeaturedMeals";
import Membership from "@/components/home/Membership";
import { MEALS } from "@/lib/data";
import React from "react";

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedMeals meals={MEALS} />
      <Membership />
    </>
  );
};

export default Home;
