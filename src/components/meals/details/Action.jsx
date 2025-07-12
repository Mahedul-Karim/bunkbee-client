import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { formatCurrency } from "@/lib/utils";
import { useStore } from "@/store/Provider";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Action = ({ price, title, category, image, likes, reviews_count }) => {
  const { user } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  const { axiosInstance } = useAxios();

  const queryClient = useQueryClient();

  const handleMealRequest = async () => {
    if (!user) {
      return toast.error("Login first to request a meal");
    }

    if (user?.badge === "bronze") {
      return toast.error(
        "You need to purchase a package in order to request a meal"
      );
    }

    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "meals/request",
        method: "POST",
        data: { title, category, image, likes, reviews_count, price },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user-requests"],
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-border p-4 h-max rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark font-medium">Price</p>
        <p className="text-lg font-bold text-dark">
          {formatCurrency(price || 0)}
        </p>
      </div>
      <Button
        className="h-10 font-semibold w-full mt-4"
        onClick={handleMealRequest}
        disabled={isLoading}
      >
        {isLoading && <Loader className="animate-spin" />}
        Request Meal
      </Button>
    </div>
  );
};

export default Action;
