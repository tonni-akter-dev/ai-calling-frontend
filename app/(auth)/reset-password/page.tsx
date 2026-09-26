import { Suspense } from 'react';
import ResetPassword from './ResetClient'; // Apnar component er path

// Ekta simple loading spinner fallback banan (apnar dark theme er sathe match kore)
const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#070d1e]">
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="text-slate-400 text-sm">Loading reset page...</p>
    </div>
  </div>
);

const ResetClientPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetClientPage;