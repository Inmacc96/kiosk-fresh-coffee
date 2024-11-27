import { Product } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "../../../src/utils/index";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border bg-white rounded-lg">
      <Image
        width={500}
        height={500}
        src={`/products/${product.image}.jpg`}
        alt={`producto ${product.name}`}
        className="rounded-t-lg"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-amber-500 text-4xl">
          {formatCurrency(product.price)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
