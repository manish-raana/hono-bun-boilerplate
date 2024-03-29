import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres:manish@localhost:5432/khatamanager2?schema=public",
});

async function main() {
 await prisma.user.create({
          data: {
            email: "mkrana173@gmail.com",
            password: "12345678",
            role: 'ADMIN',
            name: "Admin",
            phone: "1234567890",
          },
    })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
