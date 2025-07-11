import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Utensils } from "lucide-react";
import React, { useMemo } from "react";
import DataTable from "../common/DataTable";

const data = [
  {
    title: "Grilled Salmon with Herbs",
    category: "Lunch",
    price: 24.99,
    image: "https://i.ibb.co/HTMnZMqF/meal-26.jpg",
    requesterName: "Alex Kim",
    requesterAvatar: "https://i.ibb.co/4khYDKG/leo.jpg",
    requesterEmail: "alex.k@email.com",
    status: "pending",
  },
  {
    title: "Truffle Mushroom Risotto",
    category: "Dinner",
    price: 22.5,
    image: "https://i.ibb.co/TxbzgWNR/meal-27.webp",
    requesterName: "Alex Kim",
    requesterAvatar: "https://i.ibb.co/4khYDKG/leo.jpg",
    requesterEmail: "alex.k@email.com",
    status: "delivered",
  },
];

const ServeMeal = () => {
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
            <Button className={"bg-zinc-900"} disabled={stat === "delivered"}>
              <Utensils /> Server
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

export default ServeMeal;
