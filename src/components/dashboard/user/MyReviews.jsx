import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, SquarePen, Trash2 } from "lucide-react";
import React, { useMemo } from "react";
import DataTable from "../common/DataTable";

const data = [
  {
    title: "Grilled Salmon with Quinoa",
    likes: 178,
    review:
      "Absolutely delicious! The salmon was perfectly cooked and the quinoa had great flavor. Will definitely make this again.",
    rating: 4,
  },
  {
    title: "Chicken Tikka Masala",
    likes: 18,
    review:
      "Great recipe but a bit too spicy for my taste. The sauce was rich and creamy though.",
    rating: 5,
  },
  {
    title: "Vegetarian Buddha Bowl",
    likes: 123,
    review:
      "Perfect healthy meal! Love all the fresh vegetables and the tahini dressing is amazing.",
    rating: 3,
  },
];

const MyReviews = () => {
  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <h2 className="text-dark font-semibold max-w-[200px] truncate">
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
        accessorKey: "review",
        header: "Review",
        cell: ({ cell }) => {
          return (
            <p className="text-dark/90 text-sm font-medium line-clamp-2 max-w-[300px] whitespace-pre-wrap">
              {cell?.row?.original?.review}
            </p>
          );
        },
      },

      {
        accessorKey: "rating",
        header: "Rtatus",
        cell: ({ cell }) => {
          return (
            <Badge
              variant="outline"
              className="font-semibold rounded-full border-border"
            >
              {cell?.row?.original?.rating} stars
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: () => {
          return (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size={"icon"}
                className={
                  "hover:bg-transparent"
                }
              >
                <SquarePen className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                className={
                  "hover:bg-transparent"
                }
              >
                <Eye className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                className={
                  "hover:bg-transparent"
                }
              >
                <Trash2 className="size-4" />
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

export default MyReviews;
