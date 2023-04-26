import Helmet from "react-helmet";

import Hero from "../components/index/hero";
import FeaturedProducts from "../components/index/featured-products";
import LatestProducts from "../components/index/latest-products";
import Promo from "../components/index/promo";
import Brands from "../components/index/brands";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Tech Terminus | Home</title>
      </Helmet>

      <Hero />

      <div className="space-y-16 lg:space-y-32 mb-16 lg:mb-36 md:mb-48 px-5 2xl:px-0 mx-auto max-w-[1350px]">
        <FeaturedProducts />

        <LatestProducts />

        <div className="space-y-10 lg:space-y-20">
          <Promo />
          <Brands />
        </div>
      </div>
    </>
  );
};