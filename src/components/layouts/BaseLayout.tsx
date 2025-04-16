import { ReactNode } from "react";
import { Header } from "./Header";

interface BaseLayoutProps {
  children: ReactNode;
  title: string;
  showHeader?: boolean;
  showUserInfo?: boolean;
  className?: string;
}

export function BaseLayout({
  children,
  showHeader = true,
  // className = "",
}: BaseLayoutProps)	 {

  return (
    <div className="flex h-screen bg-[#E6EDF3]">
      <div className="flex flex-col flex-1 overflow-hidden">
      {showHeader && <Header />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
