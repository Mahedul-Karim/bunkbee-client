import Empty from "@/components/error/Empty";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const data = [
  {
    title: "Chicken Curry",
    type: "meal",
    category: "Lunch",
    purchasedAt: new Date(),
    price: 89,
  },
  {
    title: "Silver Package",
    type: "subscription",
    category: "Package",
    purchasedAt: new Date(),
    price: 50,
  },
];

const Transactions = () => {
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
                    <h2 className="text-dark font-semibold capitalize">{dt.category} - {dt.title}</h2>
                    <p className="text-sm text-muted">{formatDate(dt.purchasedAt)}</p>
                    
                </div>
              </CardContent>
              <CardFooter className={'flex-col items-start xs:items-end gap-1'}>
                <p className="text-xl font-semibold text-green-600">{formatCurrency(dt.price)}</p>
                <Badge className="font-semibold capitalize rounded-full bg-accent text-dark">{dt.type}</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
