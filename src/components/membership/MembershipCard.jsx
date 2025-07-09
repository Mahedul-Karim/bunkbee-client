import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router";

const MembershipCard = ({ label, type, image, price }) => {
  return (
    <Card className="bg-white shadow-none border-none">
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <div className="bg-background p-2 rounded-md">
          <img src={image} alt="" className="size-10" />
        </div>
        <h2 className="font-semibold text-dark xs:text-lg">{label}</h2>
        <p className="text-3xl xs:text-4xl font-bold text-dark">
          {formatCurrency(price || 0)}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full font-semibold bg-dark hover:bg-dark">
          <Link to={`/checkout/${type}?price=${price}`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default MembershipCard;
