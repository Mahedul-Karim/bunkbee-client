import React, { useMemo } from "react";
import DataTable from "../common/DataTable";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Clock, Heart, MessageCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const data = [
  {
    title: "Summer Peach Smoothie",
    likes: 120,
    reviews_count: 34,
    status: "delivered",
  },
  {
    title: "Classic Margherita Pizza",
    likes: 342,
    reviews_count: 87,
    status: "delivered",
  },
  {
    title: "Morning Yoga Routine",
    likes: 215,
    reviews_count: 19,
    status: "pending",
  },
  {
    title: "The Art of Mindful Eating",
    likes: 89,
    reviews_count: 12,
    status: "delivered",
  },
  {
    title: "10-Minute HIIT Workout",
    likes: 410,
    reviews_count: 76,
    status: "delivered",
  },
  {
    title: "Vegan Brownie Recipe",
    likes: 150,
    reviews_count: 28,
    status: "delivered",
  },
  {
    title: "How to Grow Succulents",
    likes: 132,
    reviews_count: 17,
    status: "pending",
  },
  {
    title: "Budget Travel Guide to Japan",
    likes: 389,
    reviews_count: 54,
    status: "delivered",
  },
  {
    title: "Healthy Meal Prep Ideas",
    likes: 230,
    reviews_count: 43,
    status: "delivered",
  },
  {
    title: "Daily Meditation for Focus",
    likes: 95,
    reviews_count: 11,
    status: "pending",
  },
  {
    title: "How to Bake Sourdough Bread",
    likes: 420,
    reviews_count: 65,
    status: "delivered",
  },
  {
    title: "Best Hiking Trails in USA",
    likes: 300,
    reviews_count: 39,
    status: "delivered",
  },
  {
    title: "Digital Decluttering Tips",
    likes: 112,
    reviews_count: 13,
    status: "pending",
  },
  {
    title: "Chocolate Chip Cookies",
    likes: 275,
    reviews_count: 58,
    status: "delivered",
  },
  {
    title: "Simple Home Workouts",
    likes: 155,
    reviews_count: 21,
    status: "delivered",
  },
  {
    title: "Beginner's Guide to Investing",
    likes: 200,
    reviews_count: 37,
    status: "delivered",
  },
  {
    title: "Zero Waste Lifestyle",
    likes: 175,
    reviews_count: 25,
    status: "pending",
  },
  {
    title: "Quick Pasta Recipes",
    likes: 340,
    reviews_count: 63,
    status: "delivered",
  },
  {
    title: "Photography for Beginners",
    likes: 198,
    reviews_count: 30,
    status: "delivered",
  },
  {
    title: "Easy Gardening Tips",
    likes: 145,
    reviews_count: 18,
    status: "pending",
  },
  {
    title: "Freelance Portfolio Guide",
    likes: 172,
    reviews_count: 24,
    status: "delivered",
  },
  {
    title: "Street Food Around the World",
    likes: 289,
    reviews_count: 49,
    status: "delivered",
  },
  {
    title: "Simple Mindful Habits",
    likes: 110,
    reviews_count: 14,
    status: "pending",
  },
  {
    title: "Homemade Pizza Secrets",
    likes: 325,
    reviews_count: 56,
    status: "delivered",
  },
  {
    title: "Camping Essentials Checklist",
    likes: 260,
    reviews_count: 42,
    status: "delivered",
  },
  {
    title: "Minimalist Wardrobe Guide",
    likes: 135,
    reviews_count: 15,
    status: "pending",
  },
  {
    title: "Budget-Friendly Recipes",
    likes: 198,
    reviews_count: 29,
    status: "delivered",
  },
  {
    title: "Simple Stress Relief Exercises",
    likes: 178,
    reviews_count: 20,
    status: "pending",
  },
  {
    title: "Morning Routines for Success",
    likes: 245,
    reviews_count: 33,
    status: "delivered",
  },
  {
    title: "Smoothie Bowl Ideas",
    likes: 188,
    reviews_count: 27,
    status: "delivered",
  },
];

const RequestedMeals = () => {
  const columnsDef = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ cell }) => {
          return (
            <h2 className="text-dark font-medium max-w-[350px] truncate">
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
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          const stats = cell?.row?.original?.status;

          return (
            <Badge
              className={`rounded-full ${
                stats === "delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } capitalize`}
            >
              {stats === "pending" ? <Clock /> : <CircleCheckBig />}
              {stats}
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ cell }) => {
          return (
            <Button
              variant="ghost"
              size={"icon"}
              className={
                "text-destructive hover:bg-transparent hover:text-destructive"
              }
              onClick={() => console.log(cell)}
            >
              <X className="size-5" />
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

export default RequestedMeals;
