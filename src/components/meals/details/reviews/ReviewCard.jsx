import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Ratings from "@/components/common/Ratings";

const ReviewCard = () => {
  return (
    <Card className="shadow-none border-none">
      <CardContent className="flex flex-col xs:flex-row items-start gap-4">
        <Avatar className="size-11 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grow flex flex-col gap-1">
            <h2 className="text-dark font-semibold">John Doe</h2>
            <Ratings rating={4} />
            <p className="text-muted/80 text-sm sm:text-base">Absolutely delicious! The chicken was perfectly seasoned and the vegetables were fresh. Will definitely order again!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
