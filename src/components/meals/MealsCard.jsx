import React, { useState } from "react";
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
import { useStore } from "@/store/Provider";
import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";

const MealsCard = ({
  id,
  title,
  image,
  rating,
  price,
  isUpcoming = false,
  likedBy = [],
}) => {
  const { user } = useStore();

  const { axiosInstance } = useAxios();

  const [likes, setLikes] = useState([...likedBy]);

  const handleUpcoming = async () => {
    if (!user) {
      return toast.error("Login first to like meals");
    }

    if (user.badge === "bronze") {
      return toast.error("You need to purchase a package inorder to give like");
    }

    try {
      if (likes.includes(user._id)) {
        setLikes((prev) => prev.filter((id) => id !== user._id));
      } else {
        setLikes((prev) => [...prev, user._id]);
      }

      await axiosInstance({
        url: "meals/upcoming/meal",
        method: "PATCH",
        data: { mealId: id },
      });
    } catch (err) {
      toast.error(err.message);
      setLikes(likedBy);
    }
  };

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
        {isUpcoming && (
          <div className="absolute top-2 left-2">
            <Button
              onClick={handleUpcoming}
              size="icon"
              className="cursor-pointer bg-white/90 text-dark hover:bg-white/90 size-8"
            >
              <Heart
                className={`stroke-0 ${
                  likes?.includes(user?._id)
                    ? "fill-destructive"
                    : "fill-gray-600"
                }`}
              />
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
        {!isUpcoming && <Button
          asChild
          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
          variant="outline"
        >
          <Link to={`/meal/${id}`}>Details</Link>
        </Button>}
      </CardFooter>
    </Card>
  );
};

export default MealsCard;
