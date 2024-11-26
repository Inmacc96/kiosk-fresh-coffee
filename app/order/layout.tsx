import OrderSidebar from "../ui/order/OrderSidebar";
import OrderSummary from "../ui/order/OrderSummary";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>
    </>
  );
};

export default RootLayout;
