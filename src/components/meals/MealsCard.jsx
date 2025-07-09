import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";
import Ratings from "../common/Ratings";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

const MealsCard = ({ id, title, image, rating, price, status }) => {
  return (
    <Card className="shadow-none pt-0 overflow-clip border-none bg-white group justify-between gap-2">
      <CardHeader className="px-0 relative">
        <img
          src={image}
          alt=""
          className="w-full aspect-[16/11] object-cover object-center"
        />
        <div className="absolute top-2 right-2">
          <Badge className={"text-sm xs:text-base bg-accent text-dark"}>
            {formatCurrency(price || 0)}
          </Badge>
        </div>
        {status === "upcoming" && (
          <div className="absolute top-2 right-2">
            <Button variant="ghost" className={"hover:bg-transparent"}>
              <Heart className="fill-muted/40" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className={"px-2 space-y-1"}>
        <h2 className="text-dark font-semibold xs:text-lg md:text-xl group-hover:text-gradient transition-colors duration-300 inline-block">
          {title}
        </h2>
        <div className="flex items-center gap-1">
          <Ratings rating={rating} />
          <p className="text-sm text-muted">({rating})</p>
        </div>
      </CardContent>
      <CardFooter className={"px-2 mt-1 justify-between"}>
        <Button
          asChild
          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
          variant="outline"
        >
          <Link to={`/meal/${id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealsCard;
