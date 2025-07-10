import { Sidebar } from "@/components/dashboard/common/Sidebar";
import { CalendarClock, CirclePlus, CreditCard, HandPlatter, Star, UserRound, UsersRound, UtensilsCrossed } from "lucide-react";
import React from "react";
import MobileSidebar from "@/components/dashboard/common/MobileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store/Provider";
import { Outlet } from "react-router";

const LINKS = [
  {
    to: "/admin/dashboard",
    label: "My Profile",
    icon: <UserRound className="size-5" />,
  },
  {
    to: "/admin/dashboard/manage-users",
    label: "Manage Users",
    icon: <UsersRound className="size-5" />,
  },
  {
    to: "/admin/dashboard/add-meal",
    label: "Add Meal",
    icon: <CirclePlus className="size-5" />,
  },
  {
    to: "/admin/dashboard/all-meals",
    label: "All Meals",
    icon: <UtensilsCrossed className="size-5" />,
  },
  {
    to: "/admin/dashboard/all-reviews",
    label: "All Reviews",
    icon: <Star className="size-5" />,
  },
  {
    to: "/admin/dashboard/serve-meal",
    label: "Serve Meal",
    icon: <HandPlatter className="size-5" />,
  },
  {
    to: "/admin/dashboard/upcomig-meals",
    label: "Upcoming Meals",
    icon: <CalendarClock className="size-5" />,
  },
];

const AdminDashboard = () => {
  const { user } = useStore();

  return (
    <div className="bg-background h-screen overflow-clip grid md:grid-cols-[230px_1fr] lg:grid-cols-[270px_1fr]">
      <aside className="h-screen overflow-y-auto hidden md:block bg-white border-r border-border p-4 lg:p-6">
        <Sidebar links={LINKS} />
      </aside>
      <main className="overflow-x-auto">
        <header className="bg-white border-b border-border h-[70px] flex items-center">
          <section className="l-container flex items-center justify-between">
            <MobileSidebar links={LINKS} />
            <Avatar className="size-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gray-200">CN</AvatarFallback>
            </Avatar>
          </section>
        </header>
        <section className="py-6 h-[calc(100vh_-_70px)] overflow-auto">
          <div className="l-container">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
