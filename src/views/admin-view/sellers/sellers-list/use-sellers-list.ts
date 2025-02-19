import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useGetSellersListQuery } from 'services/admin-services/sellers/index.query'
import { useGetUserDataQuery, useLazyGetUserDataQuery } from 'services/auth/index.query'
import { setAppViewChanging } from 'state/app-data/app-data'
import { setCurrentView } from 'state/auth/auth'
import { setUserProfile } from 'state/user-profile/user-profile'


const useSellersList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [getUserData] = useLazyGetUserDataQuery()
  const { data: sellersData } = useGetSellersListQuery()

  console.log(sellersData)

  const { control } = useForm({
    defaultValues: {
      companyName: '',
      onBoardingStatus: '',
      accountStatus: ''
    }
  })

  const handleLoginAsSeller = (sellerId: string) => {
    dispatch(setAppViewChanging(true))
    getUserData({ viewAsSellerId: sellerId })
      .then((response) => {
        const sellerData = response?.data?.data
        dispatch(setUserProfile(sellerData))
        dispatch(setCurrentView("seller"))
        router.push("/summary")
      })
      .catch((error) => {
        toast.error("Couldn't login as seller")
      })
      .finally(() => {
        dispatch(setAppViewChanging(false))
      })
  }

  return {
    sellersData,
    handleLoginAsSeller
  }
}

export default useSellersList