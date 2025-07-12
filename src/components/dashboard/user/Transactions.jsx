import Empty from "@/components/error/Empty";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const Transactions = () => {
  const { axiosInstance } = useAxios();

  const fetchTransaction = async () => {
    try {
      const { data } = await axiosInstance({
        url: "user/transactions",
      });

      if (!data.success) {
        throw new Error(data?.message);
      }

      return data?.transactions;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["user-transactions"],
    queryFn: fetchTransaction,
  });

  if (isPending) {
    return (
      <div className="h-[500px] grid place-items-center">
        <Loader className="text-primary animate-spin size-12" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-clip border border-border">
      {data?.length === 0 ? (
        <Empty title={"No transactions have been made"} />
      ) : (
        <div className="">
          {data?.map((dt, i) => (
            <Card
              key={i}
              className="rounded-none border-none shadow-none hover:bg-muted/5 flex-col xs:flex-row justify-between"
            >
              <CardContent className="flex items-center gap-4">
                <div className="bg-accent/30 rounded-full p-2 shrink-0">
                  <img src={`/${dt.type}.png`} alt="" className="size-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-dark font-semibold capitalize">
                    {dt.category} - {dt.title}
                  </h2>
                  <p className="text-sm text-muted">
                    {formatDate(new Date(dt.purchasedAt))}
                  </p>
                </div>
              </CardContent>
              <CardFooter className={"flex-col items-start xs:items-end gap-1"}>
                <p className="text-xl font-semibold text-green-600">
                  {formatCurrency(dt.price || 0)}
                </p>
                <Badge className="font-semibold capitalize rounded-full bg-accent text-dark">
                  {dt.type}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
