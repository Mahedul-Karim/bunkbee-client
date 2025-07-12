import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Ratings from "@/components/common/Ratings";

const ReviewCard = ({ rating, review, reviewerName, reviewerAvatar }) => {
  return (
    <Card className="shadow-none border-none">
      <CardContent className="flex flex-col xs:flex-row items-start gap-4">
        <Avatar className="size-11 shrink-0">
          <AvatarImage src={reviewerAvatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grow flex flex-col gap-1">
          <h2 className="text-dark font-semibold">{reviewerName}</h2>
          <Ratings rating={rating || 0} />
          <p className="text-muted/80 text-sm sm:text-base">{review}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
