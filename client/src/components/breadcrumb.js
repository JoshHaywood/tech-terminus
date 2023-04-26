import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb(props) {
  const location = useLocation();

  return (
    <>
      <div className="max-w-[1350px] mx-auto px-5 2xl:px-0 my-3 flex items-center space-x-2.5">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 hover:text-violet-600"
          >
            {" "}
            {/* Heroicons: https://heroicons.com/ */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 text-gray-500"
        >
          {" "}
          {/* Heroicons: https://heroicons.com/ */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>

        <Link to={props.crumbOneLink}>
          <p
            className={`${
              location.pathname.startsWith(props.crumbOneRoute)
                ? "block"
                : "hidden"
            } text-sm hover:underline text-gray-500`}
          >
            {props.crumbOneName}
          </p>{" "}
          {/* If the current route starts with the route of the first crumb, show the first crumb */}
        </Link>

        {props.crumbTwoLink && props.crumbTwoRoute && props.crumbTwoName && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-gray-500"
            >
              {" "}
              {/* Heroicons: https://heroicons.com/ */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link to={props.crumbTwoLink}>
              <p
                className={`${
                  location.pathname.startsWith(props.crumbTwoRoute)
                    ? "block"
                    : "hidden"
                } text-sm hover:underline text-gray-500`}
              >
                {props.crumbTwoName}
              </p>{" "}
              {/* If the current route starts with the route of the second crumb, show the second crumb */}
            </Link>
          </>
        )}
      </div>

      <hr className="w-screen"></hr>
    </>
  );
};