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

async function createJob(input) {
  const mutation = gql`
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
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input },
  });
  return data.job;
}

export const GET_JOBS = gql`
  query {
    jobs {
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

// async function getCompanyById(id) {
//   const { data } = await apolloClient.query({ query, variables: { id } });
//   return data.company;
// }

async function getJobById(id) {
  const query = gql`
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
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.job;
}

export { getJobById, createJob };