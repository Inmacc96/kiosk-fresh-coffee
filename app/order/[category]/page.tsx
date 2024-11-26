type OrderPageProps = {
  params: Promise<{ category: string }>;
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  console.log(await params);
  return <div>OrderPage</div>;
};

export default OrderPage;
