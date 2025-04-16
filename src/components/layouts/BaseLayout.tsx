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
  title,
  showHeader = true,
  showUserInfo = true,
  // className = "",
}: BaseLayoutProps)	 {

  return (
    <div className="flex h-screen bg-[#E6EDF3]">
      <div className="flex flex-col flex-1 overflow-hidden">
      {showHeader && <Header title={title} showUserInfo={showUserInfo} />}
        <main className="flex-1 overflow-y-auto p-4 bg-slate-100">{children}</main>
      </div>
    </div>
  )
}
