import React, { useRef, useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealsCard from "../meals/MealsCard";

const FeaturedMeals = ({ meals = [] }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const containerRef = useRef(null);

  const filteredMeals =
    selectedTab === "all"
      ? [...meals]?.slice(0,10)
      : meals?.filter(
          (meal) => meal?.category?.toLowerCase() === selectedTab?.toLowerCase()
        )?.slice(0,10);

  return (
    <section className="py-8 md:py-16 l-container">
      <SectionTitle>Featured Meals</SectionTitle>
      <Tabs
        defaultValue={selectedTab}
        onValueChange={setSelectedTab}
        className={"items-center sm:items-end my-4"}
      >
        <TabsList className="bg-primary/20 gap-2">
          <TabsTrigger
            value="all"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white font-semibold text-dark transition-colors duration-300 shadow-none"
            }
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="breakfast"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white font-semibold text-dark transition-colors duration-300 shadow-none"
            }
          >
            Breakfast
          </TabsTrigger>
          <TabsTrigger
            value="lunch"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white font-semibold text-dark transition-colors duration-300 shadow-none"
            }
          >
            Lunch
          </TabsTrigger>
          <TabsTrigger
            value="dinner"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white font-semibold text-dark transition-colors duration-300 shadow-none"
            }
          >
            Dinner
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-4 mt-8 meal-container"
        ref={containerRef}
      >
        {filteredMeals?.map((meal, i) => (
          <MealsCard
            key={i}
            id={meal?._id}
            title={meal?.title}
            image={meal?.image}
            rating={meal?.rating}
            price={meal?.price}
            status={meal?.status}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedMeals;
