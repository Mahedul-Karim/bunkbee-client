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

export const REVIEWS = [
  {
    id: "66c1f3a2b4a1c03e8c890001",
    user_email: "emma.watson@example.com",
    userName: "Emma Watson",
    ratings: 4.7,
    review:
      "Great hostel management system! Super easy to book and track payments.",
    user_photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2024-08-20T07:30:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890002",
    user_email: "john.doe@example.com",
    userName: "John Doe",
    ratings: 4.5,
    review: "Clean interface and very efficient for managing hostel records.",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2024-09-02T10:15:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890003",
    user_email: "sophia.martin@example.com",
    userName: "Sophia Martin",
    ratings: 5.0,
    review:
      "I love how smooth the check-in process is. Saved us a lot of time.",
    user_photoURL: "https://randomuser.me/api/portraits/women/15.jpg",
    date: "2024-09-15T14:45:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890004",
    user_email: "michael.brown@example.com",
    userName: "Michael Brown",
    ratings: 4.2,
    review:
      "Good overall, but I’d love to see more customization in the dashboard.",
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "2024-09-25T08:20:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890005",
    user_email: "olivia.jones@example.com",
    userName: "Olivia Jones",
    ratings: 4.9,
    review:
      "Excellent system for hostel admins! Billing and room allocation are seamless.",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
    date: "2024-10-05T12:00:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890006",
    user_email: "liam.smith@example.com",
    userName: "Liam Smith",
    ratings: 4.4,
    review: "The notifications feature is very helpful for students and staff.",
    user_photoURL: "https://randomuser.me/api/portraits/men/30.jpg",
    date: "2024-10-18T09:40:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890007",
    user_email: "ava.williams@example.com",
    userName: "Ava Williams",
    ratings: 4.8,
    review: "Booking, payments, and management all in one place. Love it!",
    user_photoURL: "https://randomuser.me/api/portraits/women/35.jpg",
    date: "2024-11-01T16:25:00.000Z",
  },
  {
    id: "66c1f3a2b4a1c03e8c890008",
    user_email: "ethan.johnson@example.com",
    userName: "Ethan Johnson",
    ratings: 4.6,
    review: "Reliable, user-friendly, and makes hostel management stress-free.",
    user_photoURL: "https://randomuser.me/api/portraits/men/40.jpg",
    date: "2024-11-12T11:10:00.000Z",
  },
];
