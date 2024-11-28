import { completeOrder } from "@/app/lib/actions";
import { OrderWithProducts } from "@/app/lib/types";
import { formatCurrency } from "@/app/lib/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const completeOrderWithId = completeOrder.bind(null, order.id);

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4 shadow-sm"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos pedidos:</p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-2 border-t border-gray-200 pt-4"
          >
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">({product.quantity})</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {product.product.name}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrderWithId}>
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
          value="Marcar Pedido Completado"
        />
      </form>
    </section>
  );
};

export default OrderCard;
