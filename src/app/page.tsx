import AboutPageComp from "@/components/shared/AboutPageComp";
import { Landing } from "@/components/shared/Landing";
import Tours from "@/components/shared/Tours";
import { IMAGES } from "@/constants/packages";

const App = () => {
  return (
    <>
      <Landing IMAGES={IMAGES.slice(0, 7)} />
      <Tours />
      <AboutPageComp/>
    </>
  );
};

export default App;
