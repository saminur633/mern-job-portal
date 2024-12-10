import { useEffect, useState, useMemo } from "react";
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import NewsLatter from "../components/NewsLatter";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [salaryFilter, setSalaryFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/all-jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) =>
        query ? job.jobTitle.toLowerCase().includes(query.toLowerCase()) : true
      )
      .filter((job) =>
        selectedCategory
          ? [
              job.jobLocation?.toLowerCase(),
              job.salaryType?.toLowerCase(),
              job.experienceLevel?.toLowerCase(),
              job.employmentType?.toLowerCase(),
            ].includes(selectedCategory.toLowerCase())
          : true
      )
      .filter((job) => {
        if (!salaryFilter) return true;
        const minSalary = parseFloat(job.minPrice || 0);
        const maxSalary = parseFloat(job.maxPrice || 0);
        if (salaryFilter === "< 30000") return maxSalary < 30000;
        if (salaryFilter === "30000 - 50000")
          return minSalary >= 30000 && maxSalary <= 50000;
        if (salaryFilter === "> 100000") return minSalary > 100000;
        return true;
      });
  }, [jobs, query, selectedCategory, salaryFilter]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage]);

  const handleInputChange = (e) => setQuery(e.target.value);
  const handleRadioChange = (e) => setSelectedCategory(e.target.value);
  const handleSalaryFilter = (value) => setSalaryFilter(value);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar
            handleRadioChange={handleRadioChange}
            handleSalaryFilter={handleSalaryFilter}
          />
        </div>
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : paginatedJobs.length > 0 ? (
            <Jobs
              result={paginatedJobs.map((job) => (
                <Card key={job.id} data={job} />
              ))}
            />
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-2">0 Jobs</h3>
              <p>No Data Found</p>
            </div>
          )}

          {filteredJobs.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1 ? "cursor-not-allowed" : "bg-blue-500"
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(filteredJobs.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(filteredJobs.length / itemsPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredJobs.length / itemsPerPage)
                }
                className={`px-4 py-2 rounded ${
                  currentPage === Math.ceil(filteredJobs.length / itemsPerPage)
                    ? "cursor-not-allowed"
                    : "bg-blue-500"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <NewsLatter />
        </div>
      </div>
    </div>
  );
};

export default Home;
