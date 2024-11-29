import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import ProductTable from "@/app/ui/products/ProductTable";

const getProducts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  return await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
};

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

type ProductPageProps = {
  searchParams: { page: string };
};

const ProductPage: React.FC<ProductPageProps> = async ({ searchParams }) => {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const products = await getProducts(page, pageSize);

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <ProductTable products={products} />
    </>
  );
};

export default ProductPage;
