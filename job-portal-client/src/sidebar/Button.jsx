import React from 'react';

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-blue transition duration-300"
    >
      {title}
    </button>
  );
};

export default Button;
