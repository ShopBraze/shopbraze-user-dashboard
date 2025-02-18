import { useForm } from 'react-hook-form'
import { useGetSellersListQuery } from 'services/admin-services/sellers/index.query'
import { useGetUserDataQuery, useLazyGetUserDataQuery } from 'services/auth/index.query'


const useSellersList = () => {
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
    console.log(sellerId)
    getUserData({ viewAsSellerId: sellerId })
  }

  return {
    sellersData,
    handleLoginAsSeller
  }
}

export default useSellersList