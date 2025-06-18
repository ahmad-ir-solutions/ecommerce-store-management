import { Suspense } from 'react';

interface IProps {
  children: React.ReactNode;
}

// Loading fallback
const LoadingFallback = () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#024AFE]"></div>
    </div>
  )

function WithSuspense({ children }: IProps) {
  return <Suspense fallback={<LoadingFallback/>}>{children}</Suspense>;
}

export default WithSuspense;
