import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Fetch jobs on component mount
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        setIsLoading(true);
        fetch(`http://localhost:3000/my-job/rahmansaminur51@gmail.com`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    console.error("API did not return an array:", data);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setIsLoading(false);
            });
    };

    const handleSearch = () => {
        if (!searchText) {
            fetchJobs(); // Reset to all jobs if search text is empty
        } else {
            const filteredJobs = jobs.filter((job) =>
                job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
            );
            setJobs(filteredJobs);
            setCurrentPage(1); // Reset to the first page when searching
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/job/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.acknowledged) {
                    alert("Job Deleted Successfully!");
                    fetchJobs(); // Refresh the job list after deletion
                } else {
                    alert("Failed to delete job.");
                }
            })
            .catch((error) => console.error("Error deleting job:", error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = Array.isArray(jobs) ? jobs.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Next button
    const nextPage = () => {
        if (indexOfLastItem < jobs.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Previous button
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="my-jobs-container">
                <h3 className="text-center p-4 text-2xl font-bold">All My Jobs</h3>
                <div className="search-box mb-4 text-center">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search by job title"
                        className="py-2 pl-3 border focus:outline-none lg:w-6/12 w-full mb-4"
                    />
                    <button
                        className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <section className="py-4 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mx-auto mt-5">
                    <div className="relative flex flex-col bg-white w-full shadow-lg rounded">
                        <div className="rounded-t px-4 py-3 border-0">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-blueGray-700">All Jobs</h3>
                                <Link to="/post-job">
                                    <button className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded transition duration-150">
                                        Post A New Job
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            Company Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            Salary
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 text-xs uppercase font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.length > 0 ? (
                                        currentJobs.map((job, index) => (
                                            <tr key={job._id}>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    {indexOfFirstItem + index + 1}
                                                </td>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    {job.companyName}
                                                </td>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    ${job.minPrice} - ${job.maxPrice}
                                                </td>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    <Link
                                                        to={`/edit-job/${job._id}`}
                                                        className="text-blue-600 underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                                <td className="px-6 align-middle text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDelete(job._id)}
                                                        className="bg-red-600 py-2 px-4 text-white rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center text-gray-500 p-4"
                                            >
                                                No jobs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                <div className="flex justify-center text-black space-x-8 mb-8">
                    {currentPage > 1 && (
                        <button className="hover:underline mt-2" onClick={prevPage}>
                            Previous
                        </button>
                    )}
                    {indexOfLastItem < jobs.length && (
                        <button className="hover:underline" onClick={nextPage}>
                            Next
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyJobs;
