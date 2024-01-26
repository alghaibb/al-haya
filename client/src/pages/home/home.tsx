import Hero from "@/components/Hero";

import "./home.styles.css";
import NewestAdditions from "@/components/NewestAdditions";

const home = () => {
  return (
    <div className="homeContainer">
      <Hero />
      <NewestAdditions />
    </div>
  );
};

export default home;
