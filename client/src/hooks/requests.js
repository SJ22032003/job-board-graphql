import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_NEW_JOB,
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

export function useGetJobs({ limit = 5, page = 1 }) {
  const data = useQuery(GET_JOBS, {
    variables: { input: { limit, page } },
    fetchPolicy: "network-only",
    // pollInterval: 10000 
  });
  return data;
}

export function useGetJobByID(id) {
  const data = useQuery(GET_JOB_BY_ID, {
    variables: { id },
  });
  return data;
}

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_NEW_JOB);

  const createJob = async (input) => {
    const { data } = await mutate({
      variables: { input },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_JOB_BY_ID,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return data?.job;
  };

  return {
    createJob,
    loading,
    error,
  };
}
