import React, { useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useStore } from "@/store/Provider";
import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";
import { Loader } from "lucide-react";

const PaymentForm = ({ type, price }) => {
  const elements = useElements();
  const stripe = useStripe();

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useStore();

  const { axiosInstance } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.warning("Login first to purchase a package");
    }

    try {
      setIsLoading(true);

      const transactionData = {
        title: `${type} package`,
        type: "subscription",
        category: "Package",
        price,
        packageName:type
      };

      const { data: intentData } = await axiosInstance({
        url: "payment",
        data: {
          price,
        },
        method: "POST",
      });

      if (!intentData?.success) {
        throw new Error(intentData?.message);
      }

      const client_secret = intentData.client_secret;

      const confirmPayment = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (confirmPayment.error) {
        throw new Error(confirmPayment.error.message);
      }

      const { data: successData } = await axiosInstance({
        url: "payment/success",
        data: transactionData,
        method: "POST",
      });

      setUser(successData?.user);
      toast.success("Package purchased successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Card Number</Label>
        <div className="h-10 flex items-center w-full dark:bg-input/30 border-input border rounded-md px-3">
          <CardNumberElement
            className="w-full"
            options={{
              style: {
                base: {
                  color: "#333333",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#6B7280",
                    fontSize: "14px",
                  },
                  iconColor: "#6B7280",
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Expiry Date</Label>
        <div className="h-10 flex items-center w-full dark:bg-input/30 border-input border rounded-md px-3">
          <CardExpiryElement
            className="w-full"
            options={{
              style: {
                base: {
                  color: "#333333",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#6B7280",
                    fontSize: "14px",
                  },
                  iconColor: "#6B7280",
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>CVC</Label>
        <div className="h-10 flex items-center w-full dark:bg-input/30 border-input border rounded-md px-3">
          <CardCvcElement
            className="w-full"
            options={{
              style: {
                base: {
                  color: "#333333",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#6B7280",
                    fontSize: "14px",
                  },
                  iconColor: "#6B7280",
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>
      <Button className="h-10 font-semibold w-full" disabled={isLoading}>
        {" "}
        {isLoading && <Loader className="animate-spin" />}
        Purchase
      </Button>
    </form>
  );
};

export default PaymentForm;
