import { useQuery } from "@apollo/client";
import {
  GET_COMPANY_BY_ID,
  GET_JOBS,
  GET_JOB_BY_ID,
} from "../lib/graphql/requests";

export function useGetCompanyByID(id) {
  const data = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
  });
  return data;
}

export function useGetJobs() {
  const data = useQuery(GET_JOBS, {
    fetchPolicy: "network-only",
  });
  return data;
}

export function useGetJobByID(id) {
  const data = useQuery(GET_JOB_BY_ID, {
    variables: { id },
  });
  return data;
}
