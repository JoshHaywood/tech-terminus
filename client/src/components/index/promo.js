import Button from "@mui/material/Button";

export default function Promo() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center border rounded border-blue-600 p-5 space-y-5 lg:space-y-0 lg:space-x-10 mx-auto">
      <h4 className="w-full text-lg font-semibold text-gray-700">
        Subscribe our Newsletter{" "}
        <span className="font-normal text-base text-gray-500">
          to get <span className="font-semibold text-violet-600">15%</span> off your
          next purchase
        </span>
      </h4>

      {/* Input */}
      <div className="w-full flex items-center justify-between rounded shadow bg-white">
        <input
          placeholder="Enter your email address"
          className="w-3/4 py-3.5 px-4 text-sm rounded bg-white focus:outline-blue-600"
        />

        <Button
          variant="contained"
          sx={{
            bgcolor: "#7C3AED",
            textTransform: "none",
            borderRadius: "0.5rem",
            padding: "0.7rem 1.5rem",
            boxShadow: "none",

            ":hover": {
              bgcolor: "#6d28d9",
            },
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};