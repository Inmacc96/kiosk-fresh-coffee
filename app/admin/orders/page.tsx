import { prisma } from "@/app/lib/prisma";
import Heading from "@/app/ui/Heading";
import OrderCard from "@/app/ui/order/OrderCard";

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
      <Heading>Administrar Pedidos</Heading>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay pedidos pendientes</p>
      )}
    </>
  );
};

export default OrdersPage;
