import React, { useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { Button } from "@/components/ui/button";
import {
  CircleCheckBig,
  Clock,
  Heart,
  Loader,
  MessageCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import Empty from "@/components/error/Empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const RequestedMeals = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [mealId, setMealId] = useState("");

  const { axiosInstance } = useAxios();

  const queryClient = useQueryClient();

  const deleteMeals = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "meals/request/user",
        method: "DELETE",
        data: { mealId },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: ["user-requests"],
      });

      setOpen(false);
      setMealId("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeals = async () => {
    try {
      const { data } = await axiosInstance({
        url: "meals/request/user",
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.meals;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["user-requests"],
    queryFn: fetchMeals,
  });

  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <h2 className="text-dark font-medium max-w-[350px] truncate">
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
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          const stats = cell?.row?.original?.status;

          return (
            <Badge
              className={`rounded-full ${
                stats === "delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } capitalize`}
            >
              {stats === "pending" ? <Clock /> : <CircleCheckBig />}
              {stats}
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          return (
            <Button
              variant="ghost"
              size={"icon"}
              className={
                "text-destructive hover:bg-transparent hover:text-destructive"
              }
              onClick={() => {
                setMealId(cell?.row?.original?._id);
                setOpen(true);
              }}
            >
              <X className="size-5" />
            </Button>
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
            <Button onClick={deleteMeals} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestedMeals;
