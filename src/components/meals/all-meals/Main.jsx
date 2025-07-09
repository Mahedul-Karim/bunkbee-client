import { MEALS } from "@/lib/data";
import React from "react";
import MealsCard from "../MealsCard";

const Main = () => {
  return (
    <main>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {MEALS?.map((meal, i) => (
          <MealsCard
            key={i}
            id={meal?._id}
            title={meal?.title}
            image={meal?.image}
            rating={meal?.rating}
            price={meal?.price}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
