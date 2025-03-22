import { useRouter } from 'next/router';
import React from 'react'
import GenericCouponList from './generic-coupon-list/generic-coupon-list';
import AddGenericCoupons from './add-generic-coupon/add-generic-coupon';

type Props = {}

const GenericCouponsIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "generic-coupons-list" && <GenericCouponList />}
      {tabName === "add-generic-coupons" && <AddGenericCoupons />}
    </div>
  )
}

export default GenericCouponsIndexContainer