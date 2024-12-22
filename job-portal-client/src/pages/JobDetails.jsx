import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";

const JobDetails = () => {
  const { id } = useParams(); // Destructure the `id` from the route params
  const [job, setJob] = useState(null); // Initialize `job` as null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch job details using the `id` param
    fetch(`https://jobportal-server-eight.vercel.app/all-jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        Swal.fire("Error", "Failed to load job details. Please try again later.", "error");
        setLoading(false);
      });
  }, [id]); // Include `id` in the dependency array

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      title: "Apply for Job",
      input: "url",
      inputLabel: "Enter your portfolio or resume URL",
      inputPlaceholder: "https://your-resume.com",
      showCancelButton: true,
    });

    if (url) {
      Swal.fire("Success", `Your application has been submitted! URL: ${url}`, "success");
      // Here, you can send the URL to the backend if needed
    }
  };

  if (loading) {
    return <h2 className="text-center text-lg font-semibold">Loading...</h2>; // Display loading state
  }

  if (!job) {
    return <h2 className="text-center text-lg font-semibold text-red-500">Job not found</h2>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"single-job-page"} path={"single job"} />
      <h2 className="text-2xl font-bold mb-4">Job Details: {id}</h2>
      <h3 className="text-xl mb-2">Title: {job.jobTitle}</h3>
      <p className="mb-4">Description: {job.description || "No description provided."}</p>
      <button
        className="bg-blue hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded"
        onClick={handleApply}
      >
        Apply Now
      </button>

      {/* Benefits Section */}
      {/* Benefits, Company Details, and Future Growth Section */}
<section className="mt-8 flex flex-col md:flex-row gap-8">
  {/* Benefits Section */}
  <div className="flex-1">
    <h4 className="text-lg font-semibold mb-2">Benefits:</h4>
    <p className="mb-4">
      Employees enjoy competitive salaries, comprehensive health insurance plans, generous paid time off, 
      and a double spending account. Disability insurance and employee discounts are also included, ensuring 
      a balanced work-life experience. Our company values employees' well-being, providing the resources 
      needed for personal and professional growth.
    </p>
  </div>

  {/* Company Details Section */}
  <div className="flex-1">
    <h4 className="text-lg font-semibold mb-2">Company Details:</h4>
    <p className="mb-4">
      Grand Canyon Education (GCE) is an innovative education service company dedicated to providing 
      operational, technological, and educational support for post-secondary institutions. By fostering 
      innovation and prioritizing people, GCE has established itself as a trusted industry leader. The 
      company is committed to community development and sustainability.
    </p>
  </div>

  {/* Future Growth Section */}
  <div className="flex-1">
    <h4 className="text-lg font-semibold mb-2">Future Growth:</h4>
    <p className="mb-4">
      GCE is on track for significant expansion, leveraging cutting-edge technology and a passionate 
      team. The company aims to revolutionize education, focusing on technological advancements, career 
      growth opportunities, and social impact. Join a forward-thinking organization dedicated to creating 
      a better future for all.
    </p>
  </div>
</section>


      {/* Additional Section with Lorem Ipsum */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Additional Information:</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nesciunt eaque earum sapiente omnis aut commodi voluptate, accusamus nostrum deserunt, architecto dolorem ratione consequatur saepe a obcaecati, natus nihil laudantium quo in ullam officiis tempora repudiandae. Ullam cumque pariatur at labore, iusto fugit placeat inventore eos dolore atque quae illo maiores explicabo quia assumenda harum. Odit exercitationem blanditiis laudantium, dignissimos placeat iure perferendis optio commodi! Ipsam nisi amet voluptas adipisci voluptatibus perspiciatis saepe est nobis sunt similique dolor et eius doloribus quas expedita, enim suscipit molestiae, esse aliquid neque optio voluptatum itaque! Nesciunt, enim adipisci minus ea similique asperiores ducimus fugiat, pariatur doloremque ratione placeat, distinctio debitis atque nobis ab perferendis deleniti autem velit fuga. Laborum expedita omnis velit quasi nemo reprehenderit voluptatibus, nulla tenetur soluta distinctio rem quis explicabo? Porro pariatur nam eos enim eius tempore unde beatae exercitationem aperiam. Voluptatum iusto expedita hic doloribus nulla accusantium aspernatur ducimus? Repellat numquam quis ducimus iusto facere asperiores molestiae corrupti at, dolore reiciendis, laudantium itaque repudiandae, nihil fugit eius! Maiores, aperiam? Facere alias reprehenderit quam perspiciatis quidem aut odit, praesentium earum, quos veritatis eius nulla magnam voluptatibus, deleniti perferendis! Eligendi molestiae amet vitae doloribus ex optio possimus quibusdam soluta cupiditate deleniti.
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
