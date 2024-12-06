import { prisma } from "@/app/lib/prisma";
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

  return <div></div>;
};

export default EditProductPage;
