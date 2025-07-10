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
  },
]);
