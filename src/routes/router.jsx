import NotFound from "@/components/error/NotFound";
import Root from "@/layout/Root";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
