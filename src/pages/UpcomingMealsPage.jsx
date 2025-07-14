import Empty from "@/components/error/Empty";
import MealsCard from "@/components/meals/MealsCard";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const UpcomingMealsPage = () => {
  const { axiosInstance } = useAxios();

  const fetchUpcomingMeals = async () => {
    try {
      const { data } = await axiosInstance({
        url: "meals/upcoming/admin",
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.meals;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["upcoming-meals"],
    queryFn: fetchUpcomingMeals,
  });

  if (isPending) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Loader className="text-primary animate-spin size-12" />
      </div>
    );
  }

  if (data?.length === 0) {
    return <Empty title={"No upcoming meals for now"} />;
  }

  return (
    <div className="border-t border-border">
      <section className="l-container py-16">
        <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-4 mt-8 meal-container"
      >
        {data?.map((meal, i) => (
          <MealsCard
            key={i}
            id={meal?._id}
            title={meal?.title}
            image={meal?.image}
            rating={meal?.rating}
            price={meal?.price}
            isUpcoming
            likedBy={meal?.likedBy}
          />
        ))}
      </div>
      </section>
    </div>
  );
};

export default UpcomingMealsPage;
