import { useQuery } from "@apollo/client";
import { GET_COMPANY_BY_ID, GET_JOBS } from "../lib/graphql/requests";

export function useGetCompanyByID(id) {
  const data = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
  });
  return data;
}

export function useGetJobs() {
  const data = useQuery(GET_JOBS);
  return data;
}
