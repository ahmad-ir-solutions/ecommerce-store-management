import { Outlet } from "react-router-dom"
import { BaseLayout } from "@/components/layouts/BaseLayout"

export default function AuthLayout() {
  return (
    <BaseLayout
      title="Authentication"
      showHeader={false}
      showUserInfo={false}
      className="bg-[#E6EDF3]"
    >
      <Outlet />
    </BaseLayout>
  )
}
