import LoadStripe from "@/components/common/LoadStripe";
import MembershipCard from "@/components/membership/MembershipCard";
import PaymentForm from "@/components/payment/PaymentForm";
import { MEMBERSHIP } from "@/lib/data";
import React from "react";
import { useParams } from "react-router";

const Checkout = () => {
  const { type } = useParams();

  const packageData = MEMBERSHIP?.find((mem) => mem.type === type);

  return (
    <LoadStripe>
      <section className="py-16 border-t border-border">
        <div className="l-container grid md:grid-cols-[0.4fr_1fr] gap-4">
          <div className="border border-border rounded-md overflow-clip h-max shadow-lg">
            <MembershipCard
              label={packageData?.label}
              type={packageData?.type}
              image={packageData?.image}
              price={packageData?.price}
              isInCheckout
            />
          </div>
          <div className="bg-white p-4 rounded-md border-border border shadow-lg">
            <PaymentForm type={packageData?.type} price={packageData?.price} />
          </div>
        </div>
      </section>
    </LoadStripe>
  );
};

export default Checkout;
