import { useParams } from "react-router";
import { useGetCompanyByID } from "../hooks/requests";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const { data, error, loading } = useGetCompanyByID(companyId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { company } = data;

  if (!company) return <p>Company not found</p>;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
