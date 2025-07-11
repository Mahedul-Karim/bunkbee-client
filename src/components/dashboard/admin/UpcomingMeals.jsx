import React, { useMemo } from "react";
import DataTable from "../common/DataTable";
import { Badge } from "@/components/ui/badge";
import { BookCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  {
    title: "Grilled Salmon with Herbs",
    likes: 245,
    status: "upcoming",
    category: "Lunch",
    price: 24.99,
    image: "https://i.ibb.co/HTMnZMqF/meal-26.jpg",
  },
  {
    title: "Truffle Mushroom Risotto",
    likes: 189,
    category: "Dinner",
    status: "upcoming",
    price: 22.5,
    image: "https://i.ibb.co/TxbzgWNR/meal-27.webp",
  },
];

const UpcomingMeals = () => {
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
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          return (
            <Badge className={"rounded-full bg-yellow-100 text-yellow-800"}>
              {cell?.row?.original?.status}
            </Badge>
          );
        },
      },

      {
        id: "action",
        header: "",
        cell: () => {
          return (
            <Button className="bg-zinc-900 hover:bg-zinc-900">
              <BookCheck /> Publish
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

export default UpcomingMeals;
