import Ratings from "@/components/common/Ratings";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Clock, Mail } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewCard from "./reviews/ReviewCard";
import ReviewForm from "./reviews/ReviewForm";

const Info = ({
  title,
  category,
  ingredients,
  description,
  postTime,
  distributor_name,
  distributor_email,
  distributor_avatar,
  rating,
  reviews_count,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={"capitalize rounded-full border-border"}
        >
          {category}
        </Badge>
        <p className="flex items-center text-muted gap-2 text-sm">
          <Clock className="size-4" /> Posted {formatDate(postTime)}
        </p>
      </div>
      <h1 className="text-dark text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <Ratings rating={rating} />{" "}
          <span className="text-sm text-muted">{rating}</span>
        </div>
        <p className="text-sm text-muted">({reviews_count} reviews)</p>
      </div>
      <section className="bg-background p-4 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-dark">Description</h2>
        <p className="text-muted mt-2">{description}</p>
      </section>
      <section className="bg-background p-4 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-dark">Ingredients</h2>
        <div className="flex items-center gap-4 flex-wrap my-2">
          {ingredients?.map((ing, i) => (
            <Badge
              key={i}
              className="rounded-full bg-green-100 text-green-700 font-semibold"
            >
              {ing}
            </Badge>
          ))}
        </div>
      </section>
      <section className="bg-background p-4 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-dark">Distributor</h2>
        <div className="my-2 flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarImage src={distributor_avatar} />
            <AvatarFallback className="bg-gray-200 text-sm font-semibold">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-dark font-semibold">{distributor_name}</h3>
            <p className="flex items-center text-muted text-sm gap-1">
              <Mail className="size-4" /> {distributor_email}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-background p-4 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-dark">
          Reviews ({reviews_count})
        </h2>
        <div className="flex flex-col gap-4 my-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ReviewCard key={i} />
          ))}
        </div>
      </section>
      <section className="bg-background p-4 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-dark">
          Write a Review
        </h2>
        <div className="my-4">
          <ReviewForm />
        </div>
      </section>
    </div>
  );
};

export default Info;
