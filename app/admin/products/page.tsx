import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import ProductSearchForm from "@/app/ui/products/ProductSearchForm";
import ProductsPagination from "@/app/ui/products/ProductsPagination";
import ProductTable from "@/app/ui/products/ProductTable";
import { redirect } from "next/navigation";

const productCount = async () => {
  return await prisma.product.count();
};

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

  if (page < 0) redirect("/admin/products");

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination currentPage={page} totalPages={totalPages} />
    </>
  );
};

export default ProductPage;
