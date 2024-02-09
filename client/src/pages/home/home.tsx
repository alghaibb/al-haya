import Hero from "@/components/Hero";

import "./home.styles.css";
import NewestAdditions from "@/components/NewestAdditions";
import Divider from "@/components/Divider";
import FeaturedProducts from "@/components/FeaturedProducts";

export const dynamic = "force-dynamic";

const home = () => {
  return (
    <div className="homeContainer">
      <Hero />
      <Divider />
      <NewestAdditions />
      <Divider />
      <FeaturedProducts />
    </div>
  );
};

export default home;
