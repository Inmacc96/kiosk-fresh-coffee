"use client";
import useSWR from "swr";
import { OrderWithProducts } from "../lib/types";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import LatestOrderItem from "../ui/order/LatestOrderItem";

const OrdersPage = () => {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { isLoading, data } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (!data) return;
  return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Pedidos listos</h1>
      <Logo />

      {data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LatestOrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center my-10">No hay pedido listos</p>
      )}
    </>
  );
};

export default OrdersPage;
