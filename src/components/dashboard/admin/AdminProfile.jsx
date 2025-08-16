import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStore } from "@/store/Provider";
import { Badge } from "@/components/ui/badge";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", sold: 186 },
  { month: "February", sold: 305 },
  { month: "March", sold: 237 },
  { month: "April", sold: 73 },
  { month: "May", sold: 209 },
  { month: "June", sold: 214 },
];

const chartConfig = {
  sold: {
    label: "sold",
    color: "var(--chart-1)",
  },
};

const AdminProfile = () => {
  const { user } = useStore();

  return (
    <div>
      <Card className="max-w-[300px] shadow-none border-none mx-auto gap-2">
        <CardHeader>
          <img
            src={user?.avatar}
            alt=""
            className="aspect-[16/13] object-cover object-center w-full rounded-2xl"
          />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-dark">{user?.fullName}</h2>
            <Badge
              variant={"outline"}
              className={"border-border rounded-full text-muted font-medium"}
            >
              <img src={`/${user?.badge}.png`} alt="" className="size-4" />
              {user?.badge}
            </Badge>
          </div>
          <p className="text-sm text-muted mt-1">{user?.email}</p>
          <Badge className="font-semibold capitalize rounded-full mt-2">
            {user?.mealsAdded} meals added
          </Badge>
        </CardContent>
      </Card>
      <div className="p-4 mt-8 bg-white rounded-2xl">
        <h2 className="text-lg font-bold text-dark">Meals Sold</h2>
        <div className="mt-8 max-h-[250px]">
          <ChartContainer config={chartConfig} className={'h-[250px] w-full'}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="sold" fill="var(--color-sold)" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
