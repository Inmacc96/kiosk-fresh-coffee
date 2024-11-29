"use client";
import { SearchSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProductSearchForm = () => {
  const router = useRouter();

  const handleSearchForm = async (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) =>
        toast.error(issue.message, { autoClose: 5000 })
      );
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 text-white cursor-pointer"
      />
    </form>
  );
};

export default ProductSearchForm;
