import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck } from "lucide-react";
import React, { useMemo } from "react";
import DataTable from "../common/DataTable";

const data = [
  {
    fullName: "John Doe",
    email: "test@gmail.com",
    badge: "bronze",
    role: "admin",
  },
  {
    fullName: "Test User",
    email: "test2@gmail.com",
    badge: "bronze",
    role: "user",
  },
];

const AllUsers = () => {
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
              onClick={() => console.log(cell?.row?.original)}
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
      <DataTable data={data} columns={columnsDef} />
    </div>
  );
};

export default AllUsers;
