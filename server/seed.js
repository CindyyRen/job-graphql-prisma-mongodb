import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  // 创建公司
  for (let i = 0; i < 5; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        jobs: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            slug: faker.helpers.slugify(faker.lorem.words()),
            title: faker.person.jobTitle(),
            type: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract']),
            locationType: faker.helpers.arrayElement(['Remote', 'On-site', 'Hybrid']),
            location: faker.location.city(),
            description: faker.lorem.paragraph(),
            salary: faker.number.int({ min: 30000, max: 150000 }),
            companyName: faker.company.name(),
            applicationEmail: faker.internet.email(),
            applicationUrl: faker.internet.url(),
            companyLogoUrl: faker.image.url(),
            approved: faker.datatype.boolean(),
          })),
        },
      },
    });
    console.log(`Created company with id: ${company.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// async function main() {
//   // Delete all jobs
//   await prisma.job.deleteMany({});

//   // Delete all companies
//   await prisma.company.deleteMany({});

//   console.log('Deleted all existing records.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
