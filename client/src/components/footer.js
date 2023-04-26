import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const mediaIcons = [
  /* https://fontawesome.com/icons/facebook?s=&f=brands */
  {
    label: "facebook",
    path: "#",
    svg: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
  },
  /* https://fontawesome.com/icons/facebook?s=&f=brands */
  {
    label: "twitter",
    path: "#",
    svg: "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z",
  },
  /* https://fontawesome.com/icons/facebook?s=&f=brands */
  {
    label: "instagram",
    path: "#",
    svg: "M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z",
  },
];

export default function Footer() {
  const [rows, setRows] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    //Gets all products
    axios.get("/products/featured")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    //Get username
    axios.get("/auth/validate")
    .then((res) => {
      //If user is logged in
      if (res.data.loggedIn === true) {
        //Set logged in state to true
        setLoggedIn(true);
        //Else reset to default
      } else {
        setLoggedIn(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Brought into function to avoid hook error
  const columns = [
    {
      heading: "Pages",
      links: [
        { label: "Home", path: "/" },
        loggedIn ? { label: "", path: "" } : { label: "Login", path: "/login" },
        loggedIn
          ? { label: "Checkout", path: "/checkout" }
          : { label: "Register", path: "/Register" },
      ],
    },
    {
      containerStyle: "flex flex-col justify-end",
      heading: "",
      links: [
        { label: "", path: "" },
        { label: "", path: "" },
        { label: "", path: "" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { label: "Submit form", path: "/contact" },
        { label: "+44 1234 567 890", path: "" },
        { label: "techterminus@gmail.com", path: "" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-800">
      <div className="max-w-[1350px] mx-auto p-5 2xl:px-0 2xl:py-5">
        <div className="lg:flex">
          {/* Branding */}
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <div
                id="logo"
                className="mb-3 font-['FreeSans'] font-bold text-xl text-gray-700"
              >
                TechTerminus
              </div>

              <p className="max-w-sm mt-2 text-white">
                Stay informed on our{" "}
                <span className="font-medium">social media</span> for the latest
                product announcements
              </p>

              {/* Icons */}
              <div className="flex mt-5 -mx-2">
                {mediaIcons.map((icon, index) => (
                  <Link
                    to={icon.path}
                    key={index}
                    className="mx-2 "
                    aria-label={icon.label}
                  >
                    <svg
                      className="w-5 h-5 fill-white transition-colors duration-300 hover:fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d={icon.svg}></path>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="mt-6 lg:mt-3 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Page Link */}
              {columns.map((column, index) => (
                <div key={index} className={column.containerStyle}>
                  <h4 className="text-base font-bold text-white">
                    {column.heading}
                  </h4>

                  {/* If  index is 0 or 2 */}
                  {index === 0 || index === 2
                    ? // Map pages
                      column.links.map((link, index) => (
                        <Link
                          key={index}
                          to={link.path}
                          className="block mt-2 text-sm text-white hover:underline"
                        >
                          {link.label}
                        </Link>
                      ))
                    : // Else index is 1
                      // Map products
                      rows.map((row, index) => (
                        <Link
                          key={index}
                          to={`product/${row.name}`}
                          className="block mt-2 text-sm text-white hover:underline"
                        >
                          {row.name}
                        </Link>
                      ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footnote */}
        <hr className="h-px my-6 bg-white border-none" />

        <div className="flex justify-between text-sm">
          <a href="https://www.joshhaywood-portfolio.com/" className="text-white">
            © Josh Haywood - 2005220 | {new Date().getFullYear()}
          </a>

          <div className="flex flex-row space-x-1 items-center hover:underline decoration-white">
            {" "}
            {/* Container used in place of span as CSS doesn't effect span correctly */}
            <button
              onClick={() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="text-white"
            >
              Back to top
            </button>
            <p className="text-white">↑</p>
          </div>
        </div>
      </div>
    </footer>
  );
};