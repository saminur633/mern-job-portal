import React from "react";
import Button from "./Button";

const Salary = ({ handleClick, handleRadioChange }) => {
  
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="flex flex-wrap gap-4">
        {/* Buttons for Hourly, Monthly, Yearly */}
        <Button onClickHandler={() => handleClick("Hourly")} value="Hourly" title="Hourly" />
        <Button onClickHandler={() => handleClick("Monthly")} value="Monthly" title="Monthly" />
        <Button onClickHandler={() => handleClick("Yearly")} value="Yearly" title="Yearly" />
      </div>
      <div className="mt-4">
        {/* Radio buttons for salary ranges */}
        <label className="sidebar-label-container flex items-center gap-2">
          <input
            type="radio"
            name="salary"
            value="all"
            onChange={handleRadioChange}
            className="form-radio text-blue-500"
          />
          <span className="checkmark"></span>
          All
        </label>

        <label className="sidebar-label-container flex items-center gap-2 mt-2">
          <input
            type="radio"
            name="salary"
            value="< 30000"
            onChange={handleRadioChange}
            className="form-radio text-blue-500"
          />
          <span className="checkmark"></span>
          &lt; 30,000
        </label>

        <label className="sidebar-label-container flex items-center gap-2 mt-2">
          <input
            type="radio"
            name="salary"
            value="30000 - 50000"
            onChange={handleRadioChange}
            className="form-radio text-blue-500"
          />
          <span className="checkmark"></span>
          30,000 - 50,000
        </label>

        <label className="sidebar-label-container flex items-center gap-2 mt-2">
          <input
            type="radio"
            name="salary"
            value="> 100000"
            onChange={handleRadioChange}
            className="form-radio text-blue-500"
          />
          <span className="checkmark"></span>
          &gt; 100,000
        </label>
      </div>
    </div>
  );
};

export default Salary;
