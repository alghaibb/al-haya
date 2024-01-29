import Hero from "@/components/Hero";

import "./home.styles.css";
import NewestAdditions from "@/components/NewestAdditions";
import Divider from "@/components/Divider";

const home = () => {
  return (
    <div className="homeContainer">
      <Hero />
      <Divider />
      <NewestAdditions />
    </div>
  );
};

export default home;
