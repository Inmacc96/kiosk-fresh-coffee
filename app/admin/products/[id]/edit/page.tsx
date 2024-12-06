import { prisma } from "@/app/lib/prisma";
import GoBackButton from "@/app/ui/GoBackButton";
import Heading from "@/app/ui/Heading";
import EditProductForm from "@/app/ui/products/EditProductForm";
import ProductForm from "@/app/ui/products/ProductForm";
import { notFound } from "next/navigation";

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

const EditProductPage: React.FC<EditProductPageProps> = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(+id);

  if (!product) notFound();

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductPage;
