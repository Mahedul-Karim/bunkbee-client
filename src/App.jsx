import gsap from "gsap";
import {  ScrollTrigger, SplitText } from "gsap/all";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { Toaster } from "./components/ui/sonner";

gsap.registerPlugin([ScrollTrigger, SplitText]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default App;
