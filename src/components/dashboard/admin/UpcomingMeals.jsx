import React, { useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { Badge } from "@/components/ui/badge";
import { BookCheck, Heart, Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddMealForm from "@/components/meals/AddMealForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";

const UpcomingMeals = () => {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();

  const updateMeals = async (mealId) => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "meals/upcoming/admin",
        method: "PATCH",
        data: { mealId },
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      queryClient.refetchQueries({
        queryKey: ["admin-upcoming-meals"],
      });

      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUpcomingMeals = async () => {
    try {
      const { data } = await axiosInstance({
        url: "meals/upcoming/admin",
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
    queryKey: ["admin-upcoming-meals"],
    queryFn: fetchUpcomingMeals,
  });

  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-3">
              <img
                src={cell?.row?.original?.image}
                alt=""
                className="size-10 rounded-lg object-cover"
              />
              <div>
                <div className="font-semibold capitalize text-dark whitespace-pre-wrap line-clamp-2">
                  {cell?.row?.original.title}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ cell }) => {
          return (
            <Badge variant="outline" className="border-border rounded-full">
              {cell?.row?.original?.category}
            </Badge>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ cell }) => {
          return (
            <span className="text-muted">${cell?.row?.original?.price}</span>
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
        id: "action",
        header: "",
        cell: ({ cell }) => {
          const id = cell?.row?.original?._id;

          return (
            <Button
              className="bg-zinc-900 hover:bg-zinc-900"
              disabled={isLoading}
              onClick={() => updateMeals(id)}
            >
              {isLoading ? <Loader className="animate-spin" /> : <BookCheck />}{" "}
              Publish
            </Button>
          );
        },
      },
    ],
    [isLoading]
  );

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-end mb-4">
        <Button
          className="bg-zinc-900 hover:bg-zinc-900 font-semibold"
          onClick={() => setOpen(true)}
        >
          <Plus /> Add Meal
        </Button>
      </div>
      {isPending ? (
        <div className="h-[500px] grid place-items-center">
          <Loader className="animate-spin size-12 text-primary" />
        </div>
      ) : (
        <DataTable data={data} columns={columnsDef} />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add an Upcoming Meal</DialogTitle>
            <DialogDescription className={"sr-only"}>
              They will have full access to all resources
            </DialogDescription>
          </DialogHeader>
          <AddMealForm
            isUpcomingMeal
            onUpcomingSuccess={() => {
              queryClient.refetchQueries({
                queryKey: ["admin-upcoming-meals"],
              });
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpcomingMeals;
