import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function getJobs(limit, offset) {
  return await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    skip: offset,
    take: limit,
  });
}
export async function countJobs() {
  const count = await prisma.job.count();
  return count;
}
export async function getJob(id) {
  const job=await prisma.job.findFirst({where:{id:id}})
  return job
  
}