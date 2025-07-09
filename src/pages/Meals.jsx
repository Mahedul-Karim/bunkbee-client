import Main from "@/components/meals/all-meals/Main";
import Sidebar from "@/components/meals/all-meals/Sidebar";
import React from "react";

const Meals = () => {
  return (
    <section className="border-t border-border py-16">
      <div className="l-container grid md:grid-cols-[0.6fr_1fr] lg:grid-cols-[0.4fr_1fr] gap-4 lg:gap-6">
        <Sidebar />
        <Main />
      </div>
    </section>
  );
};

export default Meals;
