import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

const LoadStripe = ({ children }) => {
  return <Elements stripe={stripe}>{children}</Elements>;
};

export default LoadStripe;
