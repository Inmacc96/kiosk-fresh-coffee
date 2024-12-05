import Heading from "@/app/ui/Heading";
import AddProductForm from "@/app/ui/products/AddProductForm";
import ProductForm from "@/app/ui/products/ProductForm";

const CreateProductPage = () => {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
};

export default CreateProductPage;
