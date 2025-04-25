import useDashboardView from "hooks/use-dashboard-view"

const useNavbar = () => {

  const { isAdminView, isSellerView, isAdminAsSellerView } = useDashboardView()

  const handleBackToAdminView = () => {
    if (window)
      window.location.href = "/sellers/sellers-list"
  }

  return {
    isAdminView, isSellerView, isAdminAsSellerView, handleBackToAdminView
  }
}

export default useNavbar