import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAxios } from "@/hooks/useAxios";
import { useStore } from "@/store/Provider";
import { useQueryClient } from "@tanstack/react-query";
import { Send, Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ReviewForm = ({ title, likes, id, reviews_count }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useStore();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState("");

  const [review, setReview] = useState("");

  const { axiosInstance } = useAxios();

  const queryClient = useQueryClient();

  const handleReview = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Login first to give a review");
    }

    if (!rating || !review) {
      return toast.warning("Rating and review is required");
    }

    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "reviews",
        method: "POST",
        data: {
          title,
          likes,
          mealId: id,
          rating,
          review,
          reviews_count,
        },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: [`meal-${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-reviews"],
      });

      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleReview}>
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
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button className="w-full h-10 font-semibold" disabled={isLoading}>
        <Send />
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
