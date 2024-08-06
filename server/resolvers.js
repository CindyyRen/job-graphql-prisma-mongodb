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
    job: async (_root, id) => {
      const job = await getJobs(id);
      if (!job) {
        throw new notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    //_root代表上一级解析器的返回值
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();
      return { items, totalCount };
    },
  },
};

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
}
// 操作步骤：
// 1. 定义错误类型
// interface Error {
//   message: String!
// }

// type JobNotFoundError implements Error {
//   message: String!
//   code: String!
// }

// type JobValidationError implements Error {
//   message: String!
//   field: String!
// }

// union JobResult = Job | JobNotFoundError | JobValidationError

// 2. 根据类型编写函数
// import { GraphQLError } from 'graphql';

// function jobNotFoundError(id) {
//   return new GraphQLError(`Job with id ${id} not found`, {
//     extensions: {
//       code: 'JOB_NOT_FOUND',
//       __typename: 'JobNotFoundError' // 添加 __typename 以匹配 schema
//     },
//   });
// }

// function jobValidationError(message, field) {
//   return new GraphQLError(message, {
//     extensions: {
//       code: 'JOB_VALIDATION_ERROR',
//       field: field,
//       __typename: 'JobValidationError' // 添加 __typename 以匹配 schema
//     },
//   });
// }

// 3. resolvers
// const resolvers = {
//   Query: {
//     job: async (_root, { id }) => {
//       const job = await getJobById(id); // 假设这是一个获取工作的函数
//       if (!job) {
//         return jobNotFoundError(id); // 直接使用函数，传入 id
//       }
//       if (!isValidJob(job)) { // 假设这是一个验证工作输入的函数
//         return jobValidationError("Invalid job input", "title"); // 直接使用函数，传入消息和字段
//       }
//       return {
//         __typename: "Job",
//         id: job.id,
//         title: job.title,
//         description: job.description
//       };
//     }
//   }
// };

// 4. GraphQL 查询 (gql):

// query GetJob($id: ID!) {
//   job(id: $id) {
//     __typename
//     ... on Job {
//       id
//       title
//       description
//     }
//     ... on JobNotFoundError {
//       message
//       code
//     }
//     ... on JobValidationError {
//       message
//       field
//     }
//   }
// }

// 5. 使用查询（比如在 Apollo Client 中）:
// import { gql, useQuery } from '@apollo/client';

// const GET_JOB = gql`
//   query GetJob($id: ID!) {
//     job(id: $id) {
//       __typename
//       ... on Job {
//         id
//         title
//         description
//       }
//       ... on JobNotFoundError {
//         message
//         code
//       }
//       ... on JobValidationError {
//         message
//         field
//       }
//     }
//   }
// `;