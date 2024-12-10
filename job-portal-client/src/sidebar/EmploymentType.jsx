import React from 'react';
import PropTypes from 'prop-types';

const EmploymentType = ({ handleRadioChange }) => {
  const experienceOptions = ["Full-Time" ,"part-Time" , "Temporary"]; // Add the options here

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type Of Employment</h4>
      {experienceOptions.map((option, index) => (
        <label
          key={index}
          className="sidebar-label-container"
          htmlFor={option.toLowerCase().replace(" ", "-")}
        >
          <input
            type="radio"
            name="work-experience"
            id={option.toLowerCase().replace(" ", "-")}
            value={option.toLowerCase()}
            onChange={handleRadioChange}
          />
          <span className="checkmark"></span>
          {option}
        </label>
      ))}
    </div>
  );
};

EmploymentType.propTypes = {
  handleRadioChange: PropTypes.func.isRequired,
};

export default EmploymentType;
