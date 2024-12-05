"use client";

import { ProductSchema } from "@/app/lib/schema";
import { toast } from "react-toastify";

type AddProductFormProps = { children: React.ReactNode };

const AddProductForm: React.FC<AddProductFormProps> = ({ children }) => {
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) =>
        toast.error(issue.message, { autoClose: 5000 })
      );
      return;
    }
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full rounded-lg mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Registrar producto"
        />
      </form>
    </div>
  );
};

export default AddProductForm;
