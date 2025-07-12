import Empty from "@/components/error/Empty";
import Action from "@/components/meals/details/Action";
import Image from "@/components/meals/details/Image";
import Info from "@/components/meals/details/Info";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const MealDetails = () => {
  const { mealId } = useParams();
  const { axiosInstance } = useAxios();

  const fetchSingleMeal = async () => {
    try {
      const { data } = await axiosInstance({
        url: `meals/${mealId}`,
      });

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: [`meal-${mealId}`, mealId],
    queryFn: fetchSingleMeal,
    retry: false,
  });

  if (isPending) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Loader className="animate-spin text-primary size-12" />
      </div>
    );
  }

  if (!data?.meal) {
    return <Empty title={"No meals found for this id"} />;
  }

  return (
    <main className="py-16 border-t border-border">
      <section className="l-container">
        <Image
          id={data?.meal?._id}
          src={data?.meal?.image}
          status={data?.meal?.status}
          likes={data?.meal?.likes}
        />
        <main className="grid sm:grid-cols-[1fr_200px] md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_300px] mt-4 gap-4">
          <Info
            title={data?.meal?.title}
            category={data?.meal?.category}
            ingredients={data?.meal?.ingredients}
            description={data?.meal?.description}
            postTime={data?.meal?.postTime}
            distributor_name={data?.meal?.distributor_name}
            distributor_email={data?.meal?.distributor_email}
            distributor_avatar={data?.meal?.distributor_avatar}
            rating={data?.meal?.rating}
            reviews_count={data?.meal?.reviews_count}
            reviews={data?.reviews}
          />
          <Action
            price={data?.meal?.price}
            title={data?.meal?.title}
            category={data?.meal?.category}
          />
        </main>
      </section>
    </main>
  );
};

export default MealDetails;
