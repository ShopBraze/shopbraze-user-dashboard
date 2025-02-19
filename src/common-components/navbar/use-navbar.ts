import useDashboardView from "hooks/use-dashboard-view"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentView } from "state/auth/auth"
import { setUserProfile } from "state/user-profile/user-profile"


const useNavbar = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const auth = useSelector((state: any) => state.auth)
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