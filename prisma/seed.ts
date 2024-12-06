import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Delete existing data
    await prisma.orderProducts.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();
    await prisma.category.deleteMany();

    // Restart the sequence
    await prisma.$executeRaw`ALTER SEQUENCE public."OrderProducts_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE public."Product_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE public."Order_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE public."Category_id_seq" RESTART WITH 1;`;

    await prisma.category.createMany({
      data: categories,
    });
    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
