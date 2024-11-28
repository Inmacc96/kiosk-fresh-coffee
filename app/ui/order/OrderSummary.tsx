"use client";
import { createOrder } from "@/app/lib/actions";
import { OrderSchema } from "@/app/lib/schema";
import { useStore } from "@/app/lib/store";
import { formatCurrency } from "@/app/lib/utils";
import { useMemo } from "react";
import { toast } from "react-toastify";
import ProductDetails from "./OrderProductItem";

const OrderSummary = () => {
  const order = useStore((state) => state.order);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.subtotal, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = { name: formData.get("name") };
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) =>
        toast.error(issue.message, { autoClose: 5000 })
      );
      return;
    }
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) =>
        toast.error(issue.message, { autoClose: 5000 })
      );
    }
  };

  return (
    <aside className="lg:h-screen lg:overflow-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
