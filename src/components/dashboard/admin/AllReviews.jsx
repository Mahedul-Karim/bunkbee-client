import { Button } from "@/components/ui/button";
import { Eye, Heart, Loader, MessageCircle, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AllReviews = () => {
  const { axiosInstance } = useAxios();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [reviewId, setReviewId] = useState("");

  const queryClient = useQueryClient();

  const deleteReviews = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "reviews",
        method: "DELETE",
        data: { reviewId },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: ["admin-all-reviews"],
      });

      setOpen(false);
      setReviewId("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllReviews = async () => {
    try {
      const { data } = await axiosInstance({
        url: "reviews",
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.reviews;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["admin-all-reviews"],
    queryFn: fetchAllReviews,
  });

  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <div className="font-medium text-dark whitespace-pre-wrap line-clamp-2">
              {cell?.row?.original.title}
            </div>
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
        accessorKey: "reviews_count",
        header: "Reviews",
        cell: ({ cell }) => {
          return (
            <p className="flex items-center gap-1 text-dark/90 text-sm font-medium">
              <MessageCircle className="size-4 text-blue-700" />
              {cell?.row?.original?.reviews_count}
            </p>
          );
        },
      },

      {
        accessorKey: "review",
        header: "Review",
        cell: ({ cell }) => {
          return (
            <p className="text-sm text-muted whitespace-pre-wrap line-clamp-2">
              {cell?.row?.original?.review}
            </p>
          );
        },
      },
      {
        id: "reviewer",
        header: "Reviewer",
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-3">
              <img
                src={cell?.row?.original?.reviewerAvatar}
                alt=""
                className="size-8 rounded-full"
              />
              <div>
                <h2 className="font-medium">
                  {cell?.row?.original?.reviewerName}
                </h2>
                <p className="text-sm text-muted">
                  {cell?.row?.original?.reviewerEmail}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          const data = cell?.row?.original;

          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-border hover:bg-transparent"
                asChild
              >
                <Link to={`/meal/${data?.mealId}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-border hover:bg-transparent"
                onClick={() => {
                  setReviewId(data._id);
                  setOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div className="bg-white rounded-md p-4">
      {isPending ? (
        <div className="h-[500px] grid place-items-center">
          <Loader className="animate-spin size-12 text-primary" />
        </div>
      ) : (
        <DataTable data={data} columns={columnsDef} />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"outline"}
              className={"hover:bg-muted/10 text-dark border-border"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={deleteReviews} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllReviews;
