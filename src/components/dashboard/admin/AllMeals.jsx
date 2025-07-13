import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Heart, Loader, MessageCircle, Trash2 } from "lucide-react";
import Ratings from "@/components/common/Ratings";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import AddMealForm from "@/components/meals/AddMealForm";

const AllMeals = () => {
  const [sortBy, setSortBy] = useState("");
  const [debounced, setDebounced] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [mealId, setMealId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [mealToUpdate, setMealToUpdate] = useState();

  const [open, setOpen] = useState(false);

  const { axiosInstance } = useAxios();

  const queryClient = useQueryClient();

  const deleteMeals = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: `meals/${mealId}`,
        method: "DELETE",
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: ["admin-all-meals", debounced],
      });

      setDeleteModal(false);
      setMealId("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllMeal = async () => {
    try {
      const { data } = await axiosInstance({
        url: "meals/admin/all",
        params: {
          sortBy,
        },
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
    queryKey: ["admin-all-meals", debounced],
    queryFn: fetchAllMeal,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(sortBy);
    }, 600);

    return () => clearTimeout(timeout);
  }, [sortBy]);

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
                <div className="font-medium text-dark whitespace-pre-wrap line-clamp-2">
                  {cell?.row?.original.title}
                </div>
                <div className="text-sm">
                  <Badge
                    variant="outline"
                    className="border-border rounded-full"
                  >
                    {cell?.row?.original?.category}
                  </Badge>
                  <span className="ml-2 text-muted">
                    ${cell?.row?.original?.price}
                  </span>
                </div>
              </div>
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
        accessorKey: "rating",
        header: "Rating",
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-2">
              <Ratings rating={cell?.row?.original?.rating} />
              <p className="text-sm text-muted">
                {cell?.row?.original?.rating}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "distributor_name",
        header: "Distributor",
        cell: ({ cell }) => {
          return (
            <p className="font-medium whitespace-pre-wrap line-clamp-2">
              {cell?.row?.original?.distributor_name}
            </p>
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
                <Link to={`/meal/${data._id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-border hover:bg-transparent"
                onClick={() => {
                  setMealToUpdate(data);
                  setOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-border hover:bg-transparent"
                onClick={() => {
                  setMealId(data._id);
                  setDeleteModal(true);
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
      <div className="mb-4 flex justify-end">
        <div className="flex items-center gap-2">
          <Label>Sort By: </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-border">
              <SelectItem value="likes">Likes</SelectItem>
              <SelectItem value="reviews_count">Reviews Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            <DialogTitle>Update Meal</DialogTitle>
            <DialogDescription className={"sr-only"}>
              They will have full access to all resources
            </DialogDescription>
          </DialogHeader>
          <AddMealForm
            existingMeal={mealToUpdate}
            isMealUpdate
            onUpdateSuccess={() => {
              queryClient.refetchQueries({
                queryKey: ["admin-all-meals", debounced],
              });
              setOpen(false);
              setMealToUpdate("");
            }}
          />
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
            <Button onClick={deleteMeals} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllMeals;
