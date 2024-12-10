import React from "react";

const Location = ({ handleRadioChange }) => {
  const locations = ["London", "Seattle", "Madrid", "Boston"]; // Example locations

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <label className="sidebar-label-container" htmlFor="all">
        <input
          type="radio"
          name="location"
          id="all"
          value=""
          onChange={handleRadioChange}
        />
        <span className="checkmark"></span>
        All
      </label>
      {locations.map((location, index) => (
        <label
          key={index}
          className="sidebar-label-container"
          htmlFor={location.toLowerCase()}
        >
          <input
            type="radio"
            name="location"
            id={location.toLowerCase()}
            value={location.toLowerCase()}
            onChange={handleRadioChange}
          />
          <span className="checkmark"></span>
          {location}
        </label>
      ))}
    </div>
  );
};

export default Location;
