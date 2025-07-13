import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader, SearchIcon, Shield, ShieldCheck } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../common/DataTable";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const { axiosInstance } = useAxios();

  const queryClient = useQueryClient();

  const updateUserRole = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance({
        url: "user/admin",
        method: "PATCH",
        data: { userId },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      queryClient.refetchQueries({
        queryKey: ["all-users", debounced],
      });

      setOpen(false);
      setUserId("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance({
        url: "user/admin",
        params: {
          search,
        },
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.users;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["all-users", debounced],
    queryFn: fetchUsers,
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
        accessorKey: "fullName",
        header: "Username",
        cell: ({ cell }) => {
          return (
            <h2 className="text-dark font-semibold max-w-[200px] truncate">
              {cell?.row?.original?.fullName}
            </h2>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ cell }) => {
          return (
            <p className="flex items-center gap-1 text-dark/90 text-sm font-medium">
              {cell?.row?.original?.email}
            </p>
          );
        },
      },
      {
        accessorKey: "badge",
        header: "Subscription",
        cell: ({ cell }) => {
          return (
            <Badge
              variant="outline"
              className="font-semibold rounded-full border-border"
            >
              <img
                src={`/${cell?.row?.original?.badge}.png`}
                alt=""
                className="size-4"
              />
              {cell?.row?.original?.badge}
            </Badge>
          );
        },
      },

      {
        accessorKey: "role",
        header: "Role",
        cell: ({ cell }) => {
          return (
            <Badge
              className={`font-semibold rounded-full border-border bg-indigo-200 text-indigo-700`}
            >
              {cell?.row?.original?.role}
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          const row = cell?.row?.original;

          return (
            <Button
              size="sm"
              variant={row?.role === "user" ? "outline" : "default"}
              onClick={() => {
                setUserId(row?._id);
                setOpen(true);
              }}
              className={`${
                row?.role === "user"
                  ? "border-border text-dark bg-transparent hover:bg-transparent hover:text-dark"
                  : "bg-zinc-900 text-white hover:bg-zinc-900"
              }`}
            >
              {row?.role === "user" ? (
                <>
                  <Shield />
                  Make Admin
                </>
              ) : (
                <>
                  <ShieldCheck />
                  Admin
                </>
              )}
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle>
              Are you sure want to update this users role?
            </DialogTitle>
            <DialogDescription className={'sr-only'}>
              They will have full access to all resources
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"outline"}
              className={"hover:bg-muted/10 text-dark border-border"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={updateUserRole} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsers;
