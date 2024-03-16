import { getCompany, companyLoader } from "./db/companies.js";
import {
  getJobs,
  getJob,
  getJobsByCompanyId,
  createJob,
  deleteJob,
  updateJob,
} from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: async (_, _inp, ctx) => {
      return getJobs();
    },
    job: async (_, { id }) => getJob(id),
    company: async (_, { id }) => getCompany(id),
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }, ctx) => {
      if (!ctx.user)
        throw new Error("You need to be logged in to create a job");
      return createJob({ companyId: ctx.user.companyId, title, description });
    },

    deleteJob: async (_, { id }) => {
      return deleteJob(id);
    },

    updateJob: async (_, { input: { title, description }, id }, ctx) => {
      console.log(ctx);
      return updateJob({ id, title, description });
    },
  },

  Job: {
    date: ({ createdAt }) => createdAt.slice(0, "yyyy-mm-dd".length),
    company: async ({ companyId }, _args) => companyLoader.load(companyId),
  },

  Company: {
    jobs: async ({ id }) => getJobsByCompanyId(id),
  },
};
