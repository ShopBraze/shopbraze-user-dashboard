export const CouponsDataTransformers = (res: any) => {

  const coupons = [] as CouponType[]

  if (res?.data?.length > 0) {
    for (let i = 0; i < res?.data?.length; i++) {
      const item = res?.data?.[i]
      let coupon = {} as CouponType

      coupon.short_id = item?.short_id
      coupon.title = item?.title
      coupon.subtitle = item?.subtitle
      coupon.code = item?.code
      coupon.coupon_type = item?.coupon_type
      coupon.discount = item?.discount
      coupon.discount_type = item?.discount_type
      coupon.expires_at = item?.expires_at
      coupon.fake_expiry_flag = item?.fake_expiry_flag
      coupon.fake_expiry_mins = item?.fake_expiry_mins
      coupon.globally_visible = item?.globally_visible
      coupon.is_active = item?.is_active
      coupon.max_discount = item?.max_discount
      coupon.max_usage = item?.max_usage
      coupon.min_order_value = item?.min_order_value
      coupon.only_for_new_customer = item?.only_for_new_customer
      coupon.per_user_limit = item?.per_user_limit
      coupon.pre_apply_on_ad = item?.pre_apply_on_ad
      coupon.product_ids = item?.product_ids

      coupons.push(coupon)
    }
  }
  return coupons
}