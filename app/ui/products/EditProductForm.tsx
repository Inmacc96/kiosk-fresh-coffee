type EditProductFormProps = { children: React.ReactNode };

const EditProductForm: React.FC<EditProductFormProps> = ({ children }) => {
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5">
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full rounded-lg mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Actualizar producto"
        />
      </form>
    </div>
  );
};

export default EditProductForm;
