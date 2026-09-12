import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <AdminSidebar />

      <div className="lg:pl-62.5">
        <AdminHeader />

        <main className="min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}