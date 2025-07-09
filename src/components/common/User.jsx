import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store/Provider";

const User = () => {
  const { user } = useStore();

  return (
    <Avatar className="size-9 md:size-10">
      <AvatarImage src={user?.avatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default User;
