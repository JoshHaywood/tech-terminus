import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function Message(props) {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Tech Terminus | {props.title}</title>
      </Helmet>

      <div className="flex flex-col text-center justify-center h-screen mx-5">
        {/* Heading */}
        <h1 className="font-bold tracking-wide">{props.heading}</h1>
        <p className="mt-4 text-gray-500">{props.message}</p>

        {/* Redirect button */}
        <div className="mt-6">
          <Button
            variant="contained"
            onClick={() => {
              navigate(props.route);
              document.documentElement.scrollTop = 0;
            }}
            sx={{
              background: "linear-gradient(to right, #7C3AED, #2563EB)",
              textTransform: "none",
              borderRadius: "0.5rem",
              marginRight: "1rem",
              padding: "0.5rem 1rem",

              ":hover": {
                background: "linear-gradient(to right, #7C3AED, #7C3AED)",
              },
            }}
          >
            {props.button}
          </Button>
        </div>
      </div>
    </>
  );
};