import { useState } from "react"

const useSidebar = () => {
  const [openedNavItemId, setOpenedNavItemId] = useState<null | number>(null)

  const handleOpenedNavItemId = (id: number | null) => {
    setOpenedNavItemId(id)
  }

  return {
    openedNavItemId,
    handleOpenedNavItemId
  }
}

export default useSidebar