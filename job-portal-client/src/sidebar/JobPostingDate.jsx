import React from 'react';

const JobPostingDate = ({ handleRadioChange }) => {
  // Define the timeframes for job posting dates
  const timeframes = [
    "All",
    "Last 24 hours",
    "Last 7 days",
    "Last month",
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date Of Posting</h4>

      {/* "All" option with always visible checkmark */}
      <label className="sidebar-label-container" htmlFor="all">
        <input
          type="radio"
          name="postingDate"
          id="all"
          value="all"
          onChange={handleRadioChange}
        />
        <span className="checkmark"></span>
        All Time
      </label>

      {/* Dynamic radio buttons for each timeframe */}
      {timeframes.slice(1).map((timeframe, index) => (
        <label
          key={index}
          className="sidebar-label-container"
          htmlFor={timeframe.toLowerCase().replace(" ", "-")}
        >
          <input
            type="radio"
            name="postingDate"
            id={timeframe.toLowerCase().replace(" ", "-")}
            value={timeframe.toLowerCase()}
            onChange={handleRadioChange}
          />
          <span className="checkmark"></span>
          {timeframe}
        </label>
      ))}
    </div>
  );
};

export default JobPostingDate;
