import React from 'react'
import useSellersList from './use-sellers-list'
import Button from 'common-components/button/button'

type Props = {}

const SellersListIndexContainer = (props: Props) => {
  const { sellersData, handleLoginAsSeller } = useSellersList()
  return (
    <div className='p-4 bg-[#fff]'>
      <div className="flex-col space-y-4">
        {
          sellersData?.map((item) => {
            return (
              <div className="flex justify-between items-center w-full" key={item?.id}>
                <p className="font-semibold">{item?.display_name}</p>
                <Button variant='primary' onClick={() => { handleLoginAsSeller(item?.id) }} >
                  Log in as Seller
                </Button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SellersListIndexContainer