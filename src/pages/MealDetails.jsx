import Action from "@/components/meals/details/Action";
import Image from "@/components/meals/details/Image";
import Info from "@/components/meals/details/Info";
import React from "react";
import { useParams } from "react-router";

const MealDetails = () => {
  const { mealId } = useParams();

  console.log(mealId);

  return (
    <main className="py-16 border-t border-border">
      <section className="l-container">
        <Image
          src={"https://i.ibb.co/LDBcNVLR/meal-23.jpg"}
          status={"published"}
          likes={2}
        />
        <main className="grid sm:grid-cols-[1fr_200px] md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_300px] mt-4 gap-4">
          <Info
            title={"Club Sandwich"}
            category={"Snacks"}
            ingredients={[
              "Bread",
              "Chicken",
              "Lettuce",
              "Tomato",
              "Mayonnaise",
            ]}
            description={
              "Classic club sandwich layered with chicken and vegetables."
            }
            postTime={new Date()}
            distributor_name={"John Doe"}
            distributor_email={"test@gmail.com"}
            distributor_avatar={""}
            rating={3.5}
            reviews_count={5}
          />
          <Action price={200} />
        </main>
      </section>
    </main>
  );
};

export default MealDetails;
