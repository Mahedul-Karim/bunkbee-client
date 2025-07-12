import { Hamburger, House, Utensils } from "lucide-react";

export const NAV_LINKS = [
  {
    to: "/",
    label: "Home",
    icon: <House className="size-5" />,
  },
  {
    to: "/meals",
    label: "Meals",
    icon: <Hamburger className="size-5" />,
  },
  {
    to: "/upcoming-meals",
    label: "Upcoming Meals",
    icon: <Utensils className="size-5" />,
  },
];

export const MEMBERSHIP = [
  {
    type: "silver",
    image: "/silver.png",
    label: "Silver",
    price: 10,
  },
  {
    type: "gold",
    image: "/gold.png",
    label: "Gold",
    price: 40,
  },
  {
    type: "platinum",
    image: "/platinum.png",
    label: "Platinum",
    price: 100,
  },
];
