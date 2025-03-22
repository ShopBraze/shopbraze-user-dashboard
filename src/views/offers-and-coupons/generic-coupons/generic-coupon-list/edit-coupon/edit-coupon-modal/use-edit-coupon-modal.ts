import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useUpdateCouponDetailsMutation } from "services/coupons/index.query"

type UseEditCouponModalProps = {
  couponData?: CouponType
  handleClose: () => void
}

const useEditCouponModal = ({ couponData, handleClose }: UseEditCouponModalProps) => {
  const [updateCouponDetails, { isLoading: isUpdating }] = useUpdateCouponDetailsMutation()

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      coupon_type: "generic",
      title: couponData?.title ?? "",
      subtitle: couponData?.subtitle ?? '',
      code: couponData?.code ?? '',
      discount_type: couponData?.discount_type ?? '',
      discount: couponData?.discount ?? '',
      max_discount: couponData?.max_discount ?? '',
      min_order_value: couponData?.min_order_value ?? '',
      expires_at: couponData?.expires_at ?? '',
      max_usage: couponData?.max_usage ?? 1000,
      per_user_limit: couponData?.per_user_limit ?? 1,
      fake_expiry_flag: couponData?.fake_expiry_flag ?? false,
      fake_expiry_mins: couponData?.fake_expiry_mins ?? '',
      only_for_new_customer: couponData?.only_for_new_customer ?? false,
      globally_visible: couponData?.globally_visible ?? true,
      pre_apply_on_ad: couponData?.pre_apply_on_ad ?? false,
      is_active: couponData?.is_active ?? false
    }
  })

  const handleSave = handleSubmit((data: any) => {
    const body = {
      is_active: data?.is_active,
      pre_apply_on_ad: data?.pre_apply_on_ad,
      expires_at: data?.expires_at,
      fake_expiry_flag: data?.fake_expiry_flag,
      fake_expiry_mins: data?.fake_expiry_mins
    }
    updateCouponDetails({ body, coupon_short_id: couponData?.short_id }).unwrap()
      .then(() => {
        toast.success("Coupon Detils Updated")
        handleClose()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
  })
  return {
    control,
    watch,
    setValue,
    handleSave,
    isUpdating
  }
}

export default useEditCouponModal