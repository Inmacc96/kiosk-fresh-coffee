import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import ProductSearchForm from "@/app/ui/products/ProductSearchForm";
import ProductsPagination from "@/app/ui/products/ProductsPagination";
import ProductTable from "@/app/ui/products/ProductTable";
import Link from "next/link";
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
  searchParams?: Promise<{ page: string }>;
};

const ProductPage: React.FC<ProductPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 10;

  if (currentPage < 0) redirect("/admin/products");

  const productsData = getProducts(currentPage, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (currentPage > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ProductPage;
