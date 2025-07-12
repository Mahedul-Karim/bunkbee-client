import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  Loader,
  Send,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MyReviews = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState("");

  const [review, setReview] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [reviewModal, setReviewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const updateReviews = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "user/reviews",
        data: {
          review,
          rating,
          reviewId,
        },
        method: "PATCH",
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setReviewModal(false);
      toast.success(data.message);
      setRating(0);
      setReview("");
      setReviewId("");
      queryClient.refetchQueries({
        queryKey: ["user-reviews"],
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeals = async () => {
    try {
      const { data } = await axiosInstance({
        url: "user/reviews",
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.reviews;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteReview = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "user/reviews",
        method: "DELETE",
        data: { reviewId },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: ["user-reviews"],
      });

      setDeleteModal(false);
      setReviewId("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: fetchMeals,
  });

  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <h2 className="text-dark font-semibold max-w-[200px] truncate">
              {cell?.row?.original?.title}
            </h2>
          );
        },
      },
      {
        accessorKey: "likes",
        header: "Likes",
        cell: ({ cell }) => {
          return (
            <p className="flex items-center gap-1 text-dark/90 text-sm font-medium">
              <Heart className="size-4 text-destructive" />
              {cell?.row?.original?.likes}
            </p>
          );
        },
      },
      {
        accessorKey: "review",
        header: "Review",
        cell: ({ cell }) => {
          return (
            <p className="text-dark/90 text-sm font-medium line-clamp-2 max-w-[300px] whitespace-pre-wrap">
              {cell?.row?.original?.review}
            </p>
          );
        },
      },

      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ cell }) => {
          return (
            <Badge
              variant="outline"
              className="font-semibold rounded-full border-border"
            >
              {cell?.row?.original?.rating} stars
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          const data = cell?.row?.original;

          return (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size={"icon"}
                className={"hover:bg-transparent"}
                onClick={() => {
                  setRating(data?.rating);
                  setReview(data?.review);
                  setReviewId(data._id);
                  setReviewModal(true);
                }}
              >
                <SquarePen className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                className={"hover:bg-transparent"}
                asChild
              >
                <Link to={`/meal/${data?.mealId}`}>
                  <Eye className="size-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                className={"hover:bg-transparent"}
                onClick={() => {
                  setReviewId(data._id);
                  setDeleteModal(true);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isPending) {
    return (
      <div className="h-[500px] grid place-items-center">
        <Loader className="text-primary animate-spin size-12" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-md p-4">
        {data?.length === 0 ? (
          <Empty title={"You have not requested any meals"} />
        ) : (
          <DataTable data={data} columns={columnsDef} />
        )}
      </div>
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle className={"sr-only"}>
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className={"sr-only"}>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={updateReviews}>
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
        </DialogContent>
      </Dialog>
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"outline"}
              className={"hover:bg-muted/10 text-dark border-border"}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={deleteReview} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyReviews;
