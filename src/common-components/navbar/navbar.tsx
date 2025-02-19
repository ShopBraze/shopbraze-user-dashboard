import { useSelector } from "react-redux"
import useNavbar from "./use-navbar"
import CloseIcon from "assets/icons/cross-icon.svg"
import Button from "common-components/button/button"
import Image from "next/image"


const Navbar = () => {
  const { userProfile } = useSelector((state: any) => state.userProfile)
  const { isAdminView, isSellerView, isAdminAsSellerView, handleBackToAdminView } = useNavbar()
  return (
    <>
      {
        isAdminAsSellerView &&
        <div className="flex justify-between items-center bg-warning-50 p-3">
          <p className="text-sm text-warning-700 font-medium">
            Logged in as : <span className="font-semibold">{userProfile?.display_name}</span>
          </p>
          <Button onClick={handleBackToAdminView}>
            <Image src={CloseIcon} alt="close.svg" className="h-5 w-5" />
          </Button>
        </div>
      }
      {
        isAdminView ? <header className="h-16 p-2 bg-[#fff] z-10 sticky top-0 border-b border-gray-200">
          Admin View Header
        </header>
          :
          <header className="h-16 p-2 bg-[#fff] z-10 sticky top-0 border-b border-gray-200">
            Seller View Header
          </header>
      }

    </>
  )
}

export default Navbar