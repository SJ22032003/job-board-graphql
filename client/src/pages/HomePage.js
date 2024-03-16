import JobList from "../components/JobList";
import { useState } from "react";
import { useGetJobs } from "../hooks/requests";
import PaginationBar from "../components/PaginationBar";

function HomePage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, loading } = useGetJobs({ limit, page });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { jobs } = data;
  const totalPages = Math.ceil(jobs.totalCount / limit);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
