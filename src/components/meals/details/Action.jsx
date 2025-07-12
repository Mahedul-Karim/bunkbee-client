import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useStore } from "@/store/Provider";
import React from "react";
import { toast } from "sonner";

const Action = ({ price }) => {
  const { user } = useStore();

  const handleMealRequest = async () => {
    if (!user) {
      return toast.error("Login first to request a meal");
    }

    if (user?.badge === "bronze") {
      return toast.error(
        "You need to purchase a package in order to request a meal"
      );
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
      >
        Request Meal
      </Button>
    </div>
  );
};

export default Action;
