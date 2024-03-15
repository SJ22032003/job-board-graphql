import JobList from "../components/JobList";
import { useGetJobs } from "../hooks/requests";

function HomePage() {
  const { data, error, loading } = useGetJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { jobs } = data;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
