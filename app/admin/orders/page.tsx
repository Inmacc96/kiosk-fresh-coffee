import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";

const getPendingOrders = async () => {
  return await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
};

const OrdersPage = async () => {
  const orders = await getPendingOrders();
  return (
    <>
      <Heading>Administrar Órdenes</Heading>
    </>
  );
};

export default OrdersPage;
