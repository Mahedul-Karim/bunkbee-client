import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store/Provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/config/firebase.config";

const User = () => {
  const { user, setUser, setToken } = useStore();

  const { axiosInstance } = useAxios();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      const { data } = await axiosInstance({
        url: "user/logout",
        method: "POST",
      });

      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none cursor-pointer">
        <Avatar className="size-9 md:size-10">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-border">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <p>{user?.fullName}</p>
            <p className="text-xs font-normal text-muted">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={"cursor-pointer hover:bg-muted/20"}
        >
          <Link to={`/${user?.role}/dashboard`}>
            <LayoutDashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={"cursor-pointer hover:bg-muted/20"}
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
