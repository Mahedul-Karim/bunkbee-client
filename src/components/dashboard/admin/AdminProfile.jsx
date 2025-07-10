import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStore } from "@/store/Provider";
import { Badge } from "@/components/ui/badge";

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
          <Badge className="font-semibold capitalize rounded-full mt-2">30 meals added</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
