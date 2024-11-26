import { Category } from "@prisma/client";
import Image from "next/image";

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="relative h-16 w-16">
        <Image
          fill
          src={`/icon_${category.slug}.svg`}
          alt={`${category.slug} category`}
        />
      </div>
      <p className="text-xl font-bold">{category.name}</p>
    </div>
  );
};

export default CategoryIcon;
