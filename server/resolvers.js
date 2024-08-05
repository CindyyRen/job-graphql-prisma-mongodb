import { GraphQLError } from 'graphql';
// import { getCompany } from './db/companies.js';
import { countJobs, getJobs } from './db/jobs.js';
export const resolvers = {
  Query: {
    // company: async (_root, { id }) => {
    //   const company = await getCompany(id);
    //   if (!company) {
    //     throw notFoundError('No Company found with id ' + id);
    //   }
    //   return company;
    // },
    // job: async (_root, { id }) => {
    //   const job = await getJob(id);
    //   if (!job) {
    //     throw notFoundError('No Job found with id ' + id);
    //   }
    //   return job;
    // },
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();
      return { items, totalCount };
    },
  },
};
