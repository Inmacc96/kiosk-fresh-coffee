import AdminSidebar from "@/app/ui/admin/AdminSideBar";
import ToastNotification from "@/app/ui/ToastNotification";
import Logo from "../ui/Logo";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="md:flex">
        <aside className="md:w-72 md:h-screen bg-white">
          <Logo />
          <AdminSidebar />
        </aside>

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
          {children}
        </main>
      </div>

      <ToastNotification />
    </>
  );
};

export default AdminLayout;
