import { ReduxProvider } from "../redux/Providers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}
