import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin([ScrollTrigger, SplitText]);

function App() {
  return (
    <>
      <h1 className="text-7xl">Hello World</h1>
      <Button>Hello World</Button>
    </>
  );
}

export default App;
