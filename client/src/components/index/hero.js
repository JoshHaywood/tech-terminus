import SearchBar from "../search-bar";
import Incentives from "./incentives";

export default function Hero() {
  return (
    <div className="mt-10 lg:mt-16 max-w-[1350px] flex flex-col justify-center pt-4 pb-16 lg:pb-24 mx-auto px-5 lg:px-10 2xl:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center  space-y-12 lg:space-y-0">
        <div className="flex flex-col items-center lg:space-x-10 lg:flex-row lg:w-1/2">
          {/* Text */}
          <div className="ml-3">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-wide mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
              Electronics
            </h1>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-wide mt-2">
              build for the future
            </h2>

            <p className="text-lg md:text-xl mt-4 font-medium text-gray-400">
              Hundreds of great deals on the latest and greatest tech designed
              to improve your productivity{" "}
            </p>
            <div className="mt-6 lg:mt-10">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>
        {/* Image */}
        <img
          className="mx-auto xl:mr-20 xl:ml-auto w-[300px] lg:w-[375px] h-auto"
          src="../images/hero.webp"
          width="375"
          height="535"
          alt="Featured product"
        ></img>
        {/* Attribution: https://dribbble.com/search/electronics-ecommerce-website */}
      </div>

      {/* Incentives */}
      <div className="ml-3">
        <Incentives />
      </div>
    </div>
  );
};