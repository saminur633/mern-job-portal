import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const UpdateJob = () => {
  const { id } = useParams(); // Retrieve the job ID from the URL
  const jobData = useLoaderData() || {}; // Handle undefined loader data safely

  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = jobData;

  const [selectedOption, setSelectedOption] = useState(
    skills ? skills.map(skill => ({ value: skill, label: skill })) : []
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption.map(option => option.value); // Include skills in the data object

    fetch(`https://jobportal-server-eight.vercel.app/update-job/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          alert('Job Updated Successfully!!');
        }
        reset();
      });
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
          {/* Job Title and Company Name */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle || ''}
                {...register('jobTitle', { required: 'Job Title is required' })}
                className="create-job-input"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={companyName || ''}
                {...register('companyName', { required: 'Company Name is required' })}
                className="create-job-input"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          {/* Min Salary and Max Salary */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Min Salary</label>
              <input
                type="number"
                defaultValue={minPrice || ''}
                {...register('minPrice', { required: 'Min Salary is required' })}
                className="create-job-input"
              />
              {errors.minPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.minPrice.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Max Salary</label>
              <input
                type="number"
                defaultValue={maxPrice || ''}
                {...register('maxPrice', { required: 'Max Salary is required' })}
                className="create-job-input"
              />
              {errors.maxPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.maxPrice.message}</p>
              )}
            </div>
          </div>

          {/* Salary Type and Job Location */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <input
                type="text"
                defaultValue={salaryType || ''}
                {...register('salaryType')}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                defaultValue={jobLocation || ''}
                {...register('jobLocation')}
                className="create-job-input"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Required Skills</label>
            <CreatableSelect
              isMulti
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="create-job-input"
            />
          </div>

          {/* Job Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              rows={6}
              defaultValue={description || ''}
              {...register('description')}
              className="create-job-input"
            />
          </div>
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

export default UpdateJob;
