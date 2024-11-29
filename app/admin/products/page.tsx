import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import ProductTable from "@/app/ui/products/ProductTable";

const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <ProductTable products={products} />
    </>
  );
};

export default ProductPage;
