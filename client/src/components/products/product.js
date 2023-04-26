import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function Product(props) {
  const { index, row, setMoreResults } = props;

  const navigate = useNavigate();

  //If less than 20 results, hide view more button
  if (index < 20) {
    setMoreResults(false);
    //Else show view more button
  } else {
    setMoreResults(true);
  }

  return (
    <div className="flex flex-col justify-between">
      <div
        onClick={() => {
          navigate(`/product/${row.name}`); // Navigate to product page
        }}
        className="bg-gradient-to-t from-gray-200 to-white overflow-hidden"
      >
        <img
          src={row.image}
          width="305"
          height="225"
          alt="product"
          className="object-contain w-full h-56 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      <div className="mt-6">
        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-700">{row.name}</h2>

        {/* Description */}
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis in
          quam nec auctor. Duis vel nulla nec urna.
        </p>

        <p className="mt-4 text-lg font-bold text-violet-600">£{row.price}</p>

        {/* View product button */}
        <Button
          onClick={() => {
            navigate(`/product/${row.name}`);
          }}
          variant="contained"
          sx={{
            marginTop: "1rem",
            width: "100%",
            bgcolor: "#e5e7eb",
            color: "#1f2937",
            boxShadow: "none",
            textTransform: "none",

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
    </div>
  );
};