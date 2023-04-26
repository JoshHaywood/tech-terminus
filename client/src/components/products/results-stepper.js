import { useState } from "react";

export default function ResultsStepper(props) {
  const { limit, setLimit, moreResults } = props;

  const [viewLess, setViewLess] = useState(false); //Sets view less to false by default
  
  const increaseResults = () => {
    setLimit(limit + 40); //Increases results by 40
    setViewLess(true); //Sets view less button to true
  };

  const decreaseResults = () => {
    //If limit is less than or equal to 40, set limit to default and disable view less button
    if (limit <= 40) {
      setViewLess(false);
      setLimit(40);
      //Else decrease limit by 40 and scroll to top
    } else {
      setLimit(limit - 40);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-evenly text-center mt-10 py-1 font-medium space-y-5 sm:space-y-0 sm:space-x-5">
      {/* View more button */}
      {moreResults && (
        <div
          onClick={increaseResults}
          className="w-full sm:w-1/2 py-2 px-4 border rounded-lg hover:shadow cursor-pointer transition-colors text-gray-600 hover:underline hover:text-gray-800"
        >
          View more results
        </div>
      )}

      {/* View less button, hidden by default */}
      {viewLess && (
        <div
          onClick={decreaseResults}
          className="w-full sm:w-1/2 py-2 px-4 border rounded-lg hover:shadow cursor-pointer transition-colors text-gray-600 hover:underline hover:text-gray-800"
        >
          View less results
        </div>
      )}
    </div>
  );
};