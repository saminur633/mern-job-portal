import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find Your <span className="text-blue">New Job</span> Today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering, and technology sectors
        are waiting for you.
      </p>

      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
        <div className="relative md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
          <input
            type="text"
            name="title"
            id="job-search"
            placeholder="What position are you looking for?"
            className="block flex-1 w-full bg-transparent py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            value={query}
          />
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
          <input
            type="text"
            name="title"
            id="job-search"
            placeholder="Location"
            className="block flex-1 w-full bg-transparent py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            
          />
          <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
        <button type="submit" className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
