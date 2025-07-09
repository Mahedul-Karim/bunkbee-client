import gsap from "gsap";
import {  ScrollTrigger, SplitText } from "gsap/all";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

gsap.registerPlugin([ScrollTrigger, SplitText]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
