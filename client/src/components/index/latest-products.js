import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";

export default function LatestProducts() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSmallMobile = window.innerWidth < 500;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    //Gets latest products
    axios.get("/products/latest")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="space-y-5">
      {/* If the user is on the product page */}
      {location.pathname.startsWith("/product") ? (
        <h3 className="font-bold text-3xl text-gray-700">
          Other product you might like
        </h3>
      ) : (
        /* Else user isn't on the product page */
        <div className="flex flex-col sm:flex-row justify-between">
          <h3 className="font-bold text-3xl text-gray-700">Our latest products</h3>

          {/* Button */}
          <div id="product-link" className="flex items-center">
            <Button
              onClick={() => {
                navigate("/results/phone");
                document.documentElement.scrollTop = 0;
              }}
              sx={{
                color: "#7C3AED",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "600",
                padding: "0",

                ":hover": {
                  background: "none",
                  color: "#6d28d9",
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
              className="w-6 h-6 text-violet-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Thumbnails */}
      {
        // #region Attributions
      }
      {/*
                Attributions:
                https://www.cleanpng.com/png-razer-deathadder-chroma-razer-firefly-hard-gaming-6589785/
                https://www.cleanpng.com/png-computer-keyboard-klaviatura-space-bar-gaming-keyp-5656732/download-png.html
                https://www.cleanpng.com/png-computer-mouse-roccat-kone-xtd-roccat-kone-pure-pe-4228453/
                https://www.cleanpng.com/png-computer-mouse-zowie-fk1-usb-gaming-mouse-optical-2397450/
                https://www.cleanpng.com/png-computer-mouse-msi-interceptor-gaming-mouse-laptop-3046182/download-png.html             
                https://www.pexels.com/photo/close-up-photo-of-gaming-mouse-2115256/
                https://www.pexels.com/photo/selective-focus-photography-of-black-gaming-mouse-1486294/   
                https://www.cleanpng.com/png-computer-keyboard-hyperx-alloy-elite-mechanical-ga-2308441/
                https://www.cleanpng.com/png-computer-keyboard-corsair-gaming-k55-rgb-rgb-color-1925922/
                https://www.cleanpng.com/png-computer-keyboard-msi-vigor-gk80-red-keyboard-cher-2644444/download-png.html
                https://www.cleanpng.com/png-computer-keyboard-xtrfy-k2-rgb-mechanical-gaming-k-3692191/
                https://www.pexels.com/photo/black-lighted-gaming-keyboard-841228/
                https://www.pexels.com/photo/crop-person-working-on-computer-and-using-mouse-4792716/
                https://www.cleanpng.com/png-logitech-g430-microphone-headphones-7-1-surround-s-3109571/
                https://www.cleanpng.com/png-headphones-gaming-headset-tt-esports-shock-headset-5589765/
                https://www.pexels.com/photo/white-beats-by-dr-dre-wireless-headphones-577769/
                https://www.pexels.com/photo/white-corded-headphones-on-yellow-surface-7054716/
                https://www.cleanpng.com/png-astro-gaming-a40-tr-with-mixamp-pro-tr-xbox-360-wi-6528251/
                https://www.cleanpng.com/png-kingston-hyperx-cloud-ii-kingston-hyperx-cloud-cor-6792131/
                https://www.shutterstock.com/image-photo/black-headphones-mockup-digital-device-1890469642
                https://www.cleanpng.com/png-laptop-png-68099/
                https://www.cleanpng.com/png-rog-strix-scar-edition-gaming-laptop-gl703-rog-str-1583834/
                https://www.cleanpng.com/png-laptop-asus-tuf-gaming-fx5-4-video-game-rog-3801374/
                https://www.cleanpng.com/png-asus-rog-strix-scar-ii-gl504-asus-rog-strix-ii-gam-7228091/
                https://www.cleanpng.com/png-laptop-intel-rog-strix-gl502-asus-republic-of-game-4198721/
                https://www.pexels.com/photo/silver-macbook-beside-iphone-18104/
                https://www.pexels.com/photo/silver-laptop-and-white-cup-on-table-7974/
                https://www.cleanpng.com/png-led-backlit-lcd-computer-monitors-dell-lenovo-legi-2847263/
                https://www.cleanpng.com/png-predator-x34-curved-gaming-monitor-computer-monito-2129790/
                https://www.cleanpng.com/png-dell-27-2560-x-1440-led-black-laptop-computer-moni-3122385/
                https://www.cleanpng.com/png-predator-x34-curved-gaming-monitor-computer-monito-6326183/
                https://www.cleanpng.com/png-lcd-television-computer-monitors-benq-zowie-monito-3470896/
                https://www.pexels.com/photo/gray-flat-screen-tv-2049411/
                https://www.pexels.com/photo/silver-imac-turned-on-displaying-different-photos-1999463/
                https://dribbble.com/shots/19331916-Free-iPhone-14-Pro-Mockup
                https://www.pexels.com/photo/silver-samsung-smartphone-47261/
                https://www.pexels.com/photo/silver-iphone-x-with-airpods-788946/
            */}
      {
        // #endregion
      }
      <div
        className={`${
          isSmallMobile ? "grid grid-cols-1 gap-14" : "grid grid-cols-2 gap-5"
        } grid md:grid-cols-4 text-left`}
      >
        {rows.map(
          (row, index) =>
            index < 12 && (
              <div key={index} className="w-full h-full overflow-hidden">
                <Link to={`/product/${row.name}`}>
                  <div className="relative">
                    <div className="overflow-hidden bg-gradient-to-t from-gray-200 to-white">
                      <img
                        src={row.image}
                        width="300"
                        height="225"
                        alt="Product thumbnail"
                        className="object-fit w-full h-56 hover:scale-105 transition duration-300 ease-in-out"
                      ></img>
                    </div>

                    <p className="absolute right-0 bottom-0 pr-2.5 pb-3 font-semibold">
                      £ {row.price}
                    </p>
                  </div>

                  <h3 className="text-base sm:text-sm text-gray-700 font-bold mt-5">
                    {row.name}
                  </h3>
                  <p className="text-base sm:text-sm hover:underline text-gray-500">
                    {row.keyword_one}, {row.keyword_two}, {row.keyword_three}
                  </p>
                </Link>

                {/* View product button */}
                <Button
                  onClick={() => {
                    navigate(`/product/${row.name}`);
                    document.documentElement.scrollTop = 0;
                  }}
                  variant="contained"
                  sx={{
                    marginTop: "0.75rem",
                    textTransform: "none",
                    width: "100%",
                    bgcolor: "#e5e7eb",
                    color: "#1f2937",
                    boxShadow: "none",

                    ":hover": {
                      boxShadow: "none",
                      bgcolor: "#d1d5db",
                      textDecoration: "underline",
                    },
                  }}
                >
                  View product
                </Button>
              </div>
            )
        )}
      </div>
    </div>
  );
};