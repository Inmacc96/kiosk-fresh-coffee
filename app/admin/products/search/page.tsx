import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import ProductSearchForm from "@/app/ui/products/ProductSearchForm";
import ProductTable from "@/app/ui/products/ProductTable";

export const searchProducts = async (searchTerm: string) => {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
};

type SearchPageProps = {
  searchParams?: Promise<{ search: string }>;
};

const SearchPage: React.FC<SearchPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const products = await searchProducts(search);

  return (
    <>
      <Heading>Resultados de búsqueda: {search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
};

export default SearchPage;
