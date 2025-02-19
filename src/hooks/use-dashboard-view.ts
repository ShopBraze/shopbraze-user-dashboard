import { useSelector } from "react-redux"

const useDashboardView = () => {
  const auth = useSelector((state: any) => state.auth)
  const userProfile = useSelector((state: any) => state.userProfile.userProfile)
  const isAdminView = auth?.user?.type === "system" && auth?.currentView === "admin"
  const isSellerView = auth?.user?.type === "seller"
  const isAdminAsSellerView = auth?.user?.type === "system" && auth?.currentView === "seller" && userProfile?.type === "seller"

  return {
    isAdminView,
    isSellerView,
    isAdminAsSellerView
  }
}

export default useDashboardView