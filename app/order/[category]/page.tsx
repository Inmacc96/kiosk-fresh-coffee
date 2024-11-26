import { prisma } from "@/app/lib/prisma";

const getProducts = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
};

type OrderPageProps = {
  params: Promise<{ category: string }>;
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const { category } = await params;
  const products = await getProducts(category);

  return <div>OrderPage</div>;
};

export default OrderPage;
