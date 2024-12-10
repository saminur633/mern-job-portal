import React from "react";

const Jobs = ({ result }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{result.length} Jobs Found</h3>
      <div className="job-list grid gap-4">
        {result.map((jobCard) => jobCard)}
      </div>
    </div>
  );
};

export default Jobs;
