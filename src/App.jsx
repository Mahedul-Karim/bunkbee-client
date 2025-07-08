import gsap from "gsap";
import { Flip, ScrollTrigger, SplitText } from "gsap/all";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

gsap.registerPlugin([ScrollTrigger, SplitText,Flip]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
