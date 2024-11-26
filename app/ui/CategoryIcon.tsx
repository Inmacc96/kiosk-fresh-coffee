"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const params = useParams<{ category: string }>();
  return (
    <Link
      className={`${
        category.slug === params.category ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      href={`/order/${category.slug}`}
    >
      <div className="relative h-16 w-16">
        <Image
          fill
          src={`/icon_${category.slug}.svg`}
          alt={`${category.slug} category`}
        />
      </div>
      <p className="text-xl font-bold">{category.name}</p>
    </Link>
  );
};

export default CategoryIcon;
