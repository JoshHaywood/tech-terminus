import { useNavigate, Link } from "react-router-dom";

import Button from "@mui/material/Button";

const cards = [
  {
    heading: "Hyperspeed wireless mouse",
    link: "/results/mouse",
    image: "../images/products/msi-mouse.png" /* Attribution: https://www.cleanpng.com/png-computer-mouse-a4tech-bloody-v5m-x-glide-multi-cor-2063324/ */,
  },

  {
    heading: "Laser precision optical keyboard",
    link: "/results/keyboard",
    image: "../images/products/hyperx-keyboard.png" /* Attribution: https://www.cleanpng.com/png-computer-keyboard-hyperx-alloy-elite-mechanical-ga-2308441/ */,
  },
];

export default function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <div className="lg:h-[350px] flex flex-col lg:flex-row justify-center lg:space-x-5 space-y-5 lg:space-y-0">
      {cards.map((card, index) => (
        <div
          id="featured-product"
          key={index}
          className="flex flex-col sm:flex-row justify-center items-center px-5 py-10 sm:space-x-5 lg:space-x-0 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600"
        >
          {/* Text */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center">
            <p className="text-sm lg:text-base font-medium text-gray-300">
              Our range of premium keyboards
            </p>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-white">
              {card.heading}
            </h2>

            <div className="mt-4 flex space-x-2 items-center">
              {" "}
              {/* Attribution: https://heroicons.com/ */}
              {/* Button */}
              <div id="featured-product-link" className="flex items-center">
                <Button
                  onClick={() => {
                    navigate(card.link);
                    document.documentElement.scrollTop = 0;
                  }}
                  sx={{
                    color: "#cbd5e1",
                    textTransform: "none",
                    padding: "0",

                    ":hover": {
                      background: "none",
                      color: "#ffffff",
                    },
                  }}
                >
                  View the range
                </Button>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Image */}
          <Link to={card.link}>
            <img
              src={card.image}
              width="300"
              height="225"
              alt="Featured product"
              className="object-contain w-full h-56"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};