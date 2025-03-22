import Button from 'common-components/button/button'
import { useState } from 'react'
import EditCouponModal from './edit-coupon-modal/edit-coupon-modal'

type EditCouponProps = {
  couponData?: CouponType
}

const EditCoupon = ({ couponData }: EditCouponProps) => {
  const [openModal, setOpenModal] = useState(false)
  const handleToggleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      <Button variant='primary' onClick={handleToggleModal}>Edit</Button>

      {openModal && <EditCouponModal couponData={couponData} open={openModal} handleClose={handleToggleModal} />}

    </>
  )
}

export default EditCoupon