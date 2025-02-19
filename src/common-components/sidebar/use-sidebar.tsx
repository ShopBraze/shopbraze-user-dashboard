import { useState } from "react"
import { useSelector } from "react-redux"

const useSidebar = () => {
  const authData = useSelector((state: any) => state.auth)
  const isAdminView = authData?.user?.type === "system" && authData?.currentView === "admin"

  const [openedNavItemId, setOpenedNavItemId] = useState<null | number>(null)

  const handleOpenedNavItemId = (id: number | null) => {
    setOpenedNavItemId(id)
  }

  return {
    openedNavItemId,
    handleOpenedNavItemId,
    isAdminView
  }
}

export default useSidebar