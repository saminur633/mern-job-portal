import React from "react";

const WorkExperience = ({ handleRadioChange }) => {
  const experienceOptions = [
    "Any Experience",
    "Internship",
    "Work Remotely",
    
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
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

export default WorkExperience;
