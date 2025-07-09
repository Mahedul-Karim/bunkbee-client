import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Star } from "lucide-react";
import React, { useState } from "react";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              className={`size-5 stroke-0  cursor-pointer 
                ${num <= rating ? "fill-yellow-400" : "fill-gray-300"}
                ${num <= hoverRating ? "fill-yellow-400" : "fill-gray-300"}
                `}
              onClick={() => setRating(num)}
              onMouseEnter={() => setHoverRating(num)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Your Review</Label>
        <Textarea
          placeholder="Share your thoughts about this meal"
          className="h-30"
        />
      </div>
      <Button className="w-full h-10 font-semibold">
        <Send />
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
