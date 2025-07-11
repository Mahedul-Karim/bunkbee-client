import NotFound from "@/components/error/NotFound";
import Root from "@/layout/Root";
import UserDashboard from "@/layout/UserDashboard";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import MealDetails from "@/pages/MealDetails";
import Meals from "@/pages/Meals";
import { createBrowserRouter } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "@/components/dashboard/user/MyProfile";
import RequestedMeals from "@/components/dashboard/user/RequestedMeals";
import MyReviews from "@/components/dashboard/user/MyReviews";
import Transactions from "@/components/dashboard/user/Transactions";
import AdminDashboard from "@/layout/AdminDashboard";
import AdminProfile from "@/components/dashboard/admin/AdminProfile";
import AllUsers from "@/components/dashboard/admin/AllUsers";
import AddMeal from "@/components/dashboard/admin/AddMeal";
import AllMeals from "../components/dashboard/admin/AllMeals";
import AllReviews from "@/components/dashboard/admin/AllReviews";
import ServeMeal from "@/components/dashboard/admin/ServeMeal";
import UpcomingMeals from "@/components/dashboard/admin/UpcomingMeals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/meal/:mealId",
        element: <MealDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <PrivateRoutes routeFor={"user"}>
        <UserDashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "requested-meals",
        element: <RequestedMeals />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "payment-history",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoutes routeFor={"admin"}>
        <AdminDashboard />
      </PrivateRoutes>
    ),
    children:[
      {
        index:true,
        element:<AdminProfile />
      },
      {
        path:'manage-users',
        element:<AllUsers />
      },
      {
        path:'add-meal',
        element:<AddMeal />
      },
      {
        path:'all-meals',
        element:<AllMeals />
      },
      {
        path:'all-reviews',
        element:<AllReviews />
      },
      {
        path:'serve-meal',
        element:<ServeMeal />
      },
      {
        path:'upcoming-meals',
        element:<UpcomingMeals />
      }
    ]
  },
]);
