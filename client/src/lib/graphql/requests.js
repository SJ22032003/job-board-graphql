import { getAccessToken } from "../auth";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  concat,
  ApolloLink,
} from "@apollo/client";

const endpoint = "http://localhost:9000/graphql";
const httpLink = createHttpLink({ uri: endpoint });

const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export const CREATE_NEW_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
      date
      description
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs($input: GetJobsPaginationInput!) {
    jobs(input: $input) {
      items {
        id
        title
        date
        description
        company {
          id
          name
          description
        }
      }
      totalCount
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query Company($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        date
      }
    }
  }
`;

export const GET_JOB_BY_ID = gql`
  query Job($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      date
      description
    }
  }
`;
