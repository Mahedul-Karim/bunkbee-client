import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader, SearchIcon, Utensils } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";

const ServeMeal = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();

  const updateMeals = async (mealId) => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "meals/request/meals",
        method: "PATCH",
        data: { mealId },
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      queryClient.refetchQueries({
        queryKey: ["all-request", debounced],
      });

      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data } = await axiosInstance({
        url: "meals/request/meals",
        params: {
          search,
        },
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.requestedMeals;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["all-request", debounced],
    queryFn: fetchRequests,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(search);
    }, 600);

    return () => clearTimeout(timeout);
  }, [search]);

  const columnsDef = useMemo(
    () => [
      {
        id: "meal info",
        header: "Meal",
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
        id: "requester",
        header: "Customer",
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-3">
              <img
                src={cell?.row?.original?.requesterAvatar}
                alt=""
                className="size-8 rounded-full"
              />
              <div>
                <h2 className="font-medium">
                  {cell?.row?.original?.requesterName}
                </h2>
                <p className="text-sm text-muted">
                  {cell?.row?.original?.requesterEmail}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          const stat = cell?.row?.original?.status;

          return (
            <Badge
              className={`${
                stat === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              } rounded-full`}
            >
              {stat === "pending" ? <Utensils /> : <CheckCircle />} {stat}
            </Badge>
          );
        },
      },

      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          const stat = cell?.row?.original?.status;

          return (
            <Button
              className={"bg-zinc-900 hover:bg-zinc-900"}
              disabled={stat === "delivered" || isLoading}
              onClick={() => updateMeals(cell?.row?.original?._id)}
            >
              {isLoading ? <Loader className="animate-spin" /> : <Utensils />}{" "}
              Serve
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-md p-4">
      <div className="mb-4 flex justify-end">
        <div className="flex items-center bg-white rounded-md h-10 pr-2 border border-border max-w-[350px]">
          <Input
            type={"text"}
            className="bg-transparent shadow-none border-none text-dark"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="text-muted" />
        </div>
      </div>
      {isPending ? (
        <div className="h-[500px] grid place-items-center">
          <Loader className="animate-spin size-12 text-primary" />
        </div>
      ) : (
        <DataTable data={data} columns={columnsDef} />
      )}
    </div>
  );
};

export default ServeMeal;
