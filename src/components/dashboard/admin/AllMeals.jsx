import React, { useMemo } from "react";
import DataTable from "../common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Heart, MessageCircle, Trash2 } from "lucide-react";
import Ratings from "@/components/common/Ratings";
import { Button } from "@/components/ui/button";

const data = [
  {
    title: "Grilled Salmon with Herbs",
    likes: 245,
    reviews_count: 89,
    rating: 4.8,
    distributor_name: "Ocean Fresh Restaurant",
    category: "Lunch",
    price: 24.99,
    image: "https://i.ibb.co/HTMnZMqF/meal-26.jpg",
  },
  {
    title: "Truffle Mushroom Risotto",
    likes: 189,
    reviews_count: 67,
    rating: 4.6,
    distributor_name: "Italian Bistro",
    category: "Dinner",
    price: 22.5,
    image: "https://i.ibb.co/TxbzgWNR/meal-27.webp",
  },
];

const AllMeals = () => {
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
                  <Badge variant="outline" className="border-border rounded-full">
                    {cell?.row?.original?.category}
                  </Badge>
                  <span className="ml-2 text-muted">${cell?.row?.original?.price}</span>
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
              <p className="text-sm text-muted">{cell?.row?.original?.rating}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "distributor_name",
        header: "Distributor",
        cell: ({ cell }) => {
          return <p className="font-medium whitespace-pre-wrap line-clamp-2">{cell?.row?.original?.distributor_name}</p>;
        },
      },
      {
        id: "action",
        header: "",
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-border hover:bg-transparent">
                <Eye className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-border hover:bg-transparent">
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-border hover:bg-transparent"
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
      <DataTable data={data} columns={columnsDef} />
    </div>
  );
};

export default AllMeals;
