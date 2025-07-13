import { useStore } from "@/store/Provider";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";

const PrivateRoutes = ({ children, routeFor = [] }) => {
  const { user, isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Loader className="text-primary size-12 animate-spin" />
      </div>
    );
  }

  if (!user && !isLoading) {
    return <Navigate to={"/login"} />;
  }

  if (!isLoading && !routeFor?.includes(user?.role)) {
    toast.error("You are not authorized to access this resources");

    return <Navigate to={"/"} />;
  }

  return children;
};

export default PrivateRoutes;
