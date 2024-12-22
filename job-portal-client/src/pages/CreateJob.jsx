import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data); // Logs the form data
    fetch("https://jobportal-server-eight.vercel.app/post-job" ,{
      method: "POST",
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if(result.acknowledged === true){
        alert("Job Posted Successfully!!")
      }
      reset();
    })
  
  };

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'C++', label: 'C++' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'React', label: 'React' },
    { value: 'Node', label: 'Node' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Redux', label: 'Redux' },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st Row */}
          <div className="create-job-flex">
            {/* Job Title */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue="Web Developer"
                {...register('jobTitle', { required: 'Job Title is required' })}
                className="create-job-input"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register('companyName', { required: 'Company Name is required' })}
                className="create-job-input"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          {/* 2nd Row */}
          <div className="create-job-flex">
            {/* Minimum Salary */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                placeholder="$20k"
                {...register('minPrice', {
                  required: 'Minimum Salary is required',
                  min: { value: 0, message: 'Minimum Salary cannot be negative' },
                })}
                className="create-job-input"
              />
              {errors.minPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.minPrice.message}</p>
              )}
            </div>

            {/* Maximum Salary */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                placeholder="$120k"
                {...register('maxPrice', {
                  required: 'Maximum Salary is required',
                  validate: (value) =>
                    parseFloat(value) > parseFloat(watch('minPrice')) ||
                    'Maximum Salary must be greater than Minimum Salary',
                })}
                className="create-job-input"
              />
              {errors.maxPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.maxPrice.message}</p>
              )}
            </div>
          </div>

          {/* 3rd Row */}
          <div className="create-job-flex">
            {/* Salary Type */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register('salaryType', { required: 'Salary Type is required' })}
                className="create-job-input"
              >
                <option value="">Choose Salary Type</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              {errors.salaryType && (
                <p className="text-red-500 text-sm mt-1">{errors.salaryType.message}</p>
              )}
            </div>

            {/* Job Location */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register('jobLocation', { required: 'Job Location is required' })}
                className="create-job-input"
              />
              {errors.jobLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.jobLocation.message}</p>
              )}
            </div>
          </div>

          {/* 4th Row */}
          <div className="create-job-flex">
            {/* Job Posting Date */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                {...register('postingDate', { required: 'Job Posting Date is required' })}
                className="create-job-input"
              />
              {errors.postingDate && (
                <p className="text-red-500 text-sm mt-1">{errors.postingDate.message}</p>
              )}
            </div>

            {/* Experience Level */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register('experienceLevel', { required: 'Experience Level is required' })}
                className="create-job-input"
              >
                <option value="">Choose Experience Level</option>
                <option value="any-experience">Any Experience</option>
                <option value="Internship">Internship</option>
                <option value="work-Remotely">Work-Remotely</option>
              </select>
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>
              )}
            </div>
          </div>

          {/* 5th Row */}
          <div>
            <label className="block mb-2 text-lg">Required Skills Sets:</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* 6th Row */}
          <div className="create-job-flex">
            {/* Company Logo */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="paste your company logo url: https://www.weshare.com/img1"
                {...register('companyLogo', { required: 'Company Logo is required' })}
                className="create-job-input"
              />
              {errors.companyLogo && (
                <p className="text-red-500 text-sm mt-1">{errors.companyLogo.message}</p>
              )}
            </div>

            {/* Employment Type */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register('employmentType', { required: 'Employment Type is required' })}
                className="create-job-input"
              >
                <option value="">Choose Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.employmentType && (
                <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>
              )}
            </div>
          </div>
           {/* 7th row */}
           <div className="w-full">
  <label className="block mb-2 text-lg">Job Description</label>
  <textarea
    className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
    rows={6}
    defaultValue={
      "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
    }
    placeholder="Job Description"
    {...register("description")}
  />
</div>



          {/* 8th row */}
<div className="w-full">
  <label className="block mb-2 text-lg">Job Posted By Email</label>
  <input
    type="email"
    placeholder="Your Email"
    {...register('postedBY', {
      required: 'Email is required',
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: 'Please enter a valid email address',
      },
    })}
    className="create-job-input"
  />
</div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Submit"
            className="my-5 bg-blue text-white py-2 px-4 rounded cursor-pointer"
          />
          
        </form>
        
      </div>
    </div>
    
  );
};

export default CreateJob;
