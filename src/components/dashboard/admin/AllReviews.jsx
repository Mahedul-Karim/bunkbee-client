import { Button } from "@/components/ui/button";
import { Eye, Heart, MessageCircle, Trash2 } from "lucide-react";
import React, { useMemo } from "react";
import DataTable from "../common/DataTable";

const data = [
  {
    title: "Grilled Salmon with Herbs",
    likes: 245,
    reviews_count: 89,
    review: "Ocean Fresh Restaurant",
    reviewerName: "Alex Kim",
    reviewerAvatar: "https://i.ibb.co/4khYDKG/leo.jpg",
    reviewerEmail: "alex.k@email.com",
  },
  {
    title: "Truffle Mushroom Risotto",
    likes: 189,
    reviews_count: 67,
    review: "Nice meal",
    reviewerName: "Alex Kim",
    reviewerAvatar: "https://i.ibb.co/4khYDKG/leo.jpg",
    reviewerEmail: "alex.k@email.com",
  },
];

const AllReviews = () => {
  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <div className="font-medium text-dark whitespace-pre-wrap line-clamp-2">
              {cell?.row?.original.title}
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
        accessorKey: "review",
        header: "Review",
        cell: ({ cell }) => {
          return (
            <p className="text-sm text-muted whitespace-pre-wrap line-clamp-2">
              {cell?.row?.original?.review}
            </p>
          );
        },
      },
      {
        id: "reviewer",
        header: "Reviewer",
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-3">
              <img src={cell?.row?.original?.reviewerAvatar} alt="" className="size-8 rounded-full" />
              <div>
                <h2 className="font-medium">{cell?.row?.original?.reviewerName}</h2>
                <p className="text-sm text-muted">{cell?.row?.original?.reviewerEmail}</p>
              </div>
            </div>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-border hover:bg-transparent"
              >
                <Eye className="h-4 w-4" />
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

export default AllReviews;
