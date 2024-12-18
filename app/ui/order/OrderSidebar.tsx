import { prisma } from "@/app/lib/prisma";
import CategoryIcon from "../CategoryIcon";
import Logo from "../Logo";
async function getCategories() {
  return await prisma.category.findMany();
}

const OrderSidebar = async () => {
  const categories = await getCategories();

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
};

export default OrderSidebar;
