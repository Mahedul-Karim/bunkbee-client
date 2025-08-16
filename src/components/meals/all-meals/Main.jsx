import React, { useEffect, useMemo, useState } from "react";
import MealsCard from "../MealsCard";
import { useAxios } from "@/hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router";
import Empty from "@/components/error/Empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Main = () => {
  const [sortBy, setSortBy] = useState("");

  // const [allMeals,setAllMeals] = useState([])

  const { axiosInstance } = useAxios();

  const [searchParams] = useSearchParams();

  const filters = {
    price: searchParams?.get("price") || "",
    category: searchParams?.get("category") || "",
    search: searchParams?.get("search") || "",
  };

  const fetchMeals = async ({ pageParam = 1, queryKey }) => {
    const [_key, filters] = queryKey;

    const { data } = await axiosInstance({
      url: "meals",
      params: {
        page: pageParam,
        ...filters,
      },
    });

    return data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["meals", filters],
    queryFn: fetchMeals,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {}, [data?.pages]);

  const allMeals = useMemo(() => {
    const allData = data?.pages?.flatMap((page) => page.meals) || [];

    if (allData.length === 0) {
      return allData;
    }

    if (!sortBy) {
      return allData;
    }

    if (sortBy === "asc") {
      return allData.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "dsc") {
      return allData.sort((a, b) => b.price - a.price);
    }
  }, [data?.pages, sortBy]);

  if (isLoading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Loader className="text-primary animate-spin size-12" />
      </div>
    );
  }

  return (
    <main>
      <div className="mb-4 flex items-center justify-end">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="border-border">
            <SelectItem value="asc">Price(low to high)</SelectItem>
            <SelectItem value="dsc">Price(high to low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <InfiniteScroll
        dataLength={allMeals.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<div className="text-center text-muted">Loading Meals...</div>}
        endMessage={
          <div className="text-center my-4 text-muted">
            <Empty title={"No more meals available"} />
          </div>
        }
        scrollableTarget="root"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {allMeals?.map((meal, i) => (
            <MealsCard
              key={i}
              id={meal?._id}
              title={meal?.title}
              image={meal?.image}
              rating={meal?.rating}
              price={meal?.price}
            />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default Main;
