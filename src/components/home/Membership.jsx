import React from "react";
import SectionTitle from "../common/SectionTitle";
import MembershipCard from "../membership/MembershipCard";
import { MEMBERSHIP } from "@/lib/data";



const Membership = () => {
  return (
    <section className="bg-background py-8 md:py-16 px-4">
      <SectionTitle>Featured Packages</SectionTitle>
      <div className="mt-8 max-w-[850px] w-full mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MEMBERSHIP?.map((mem, i) => (
            <MembershipCard
              key={i}
              label={mem.label}
              type={mem.type}
              image={mem.image}
              price={mem.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
