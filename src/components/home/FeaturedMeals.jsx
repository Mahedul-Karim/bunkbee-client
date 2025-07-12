import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealsCard from "../meals/MealsCard";
import { Loader } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedMeals = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const { axiosInstance } = useAxios();
  
  
    const fetchMeals = async () => {
  
      const { data } = await axiosInstance({
        url: "meals",
        params: {
          page: 1,
          category:selectedTab
        },
      });
  
      return data;
    };


    const { data,isPending } = useQuery({
      queryKey:['featured-meals',selectedTab],
      queryFn:fetchMeals
    })
  

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
      {isPending && <div className="h-[250px] grid place-items-center">
        <Loader className="animate-spin size-12 text-primary" />
      </div>}
      {!isPending && data?.meals?.length > 0 && <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-4 mt-8 meal-container"
      >
        {data?.meals?.map((meal, i) => (
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
      </div>}
    </section>
  );
};

export default FeaturedMeals;
