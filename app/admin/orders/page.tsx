"use client";
import { OrderWithProducts } from "@/app/lib/types";
import Heading from "@/app/ui/Heading";
import OrderCard from "@/app/ui/order/OrderCard";
import Spinner from "@/app/ui/Spinner";
import useSWR from "swr";

const OrdersPage = () => {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (!data) return;
  return (
    <>
      <Heading>Administrar Pedidos</Heading>
      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map((order) => (
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
