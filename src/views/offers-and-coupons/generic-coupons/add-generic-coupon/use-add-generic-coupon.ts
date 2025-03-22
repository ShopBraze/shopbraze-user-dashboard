import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { usePostCreateCouponMutation } from 'services/coupons/index.query'


const useAddGenericCoupon = () => {

  const router = useRouter()
  const [postCreateCoupon, { isLoading: isCreating }] = usePostCreateCouponMutation()

  const [selectedProducts, setSelectedProducts] = useState<Catalogue[]>([])

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      coupon_type: "generic",
      title: '',
      subtitle: '',
      code: '',
      discount_type: 'percentage',
      discount: '',
      max_discount: '',
      min_order_value: '',
      expires_at: '',
      max_usage: 1000,
      per_user_limit: 1,
      fake_expiry_flag: false,
      fake_expiry_mins: '',
      only_for_new_customer: false,
      globally_visible: true,
      pre_apply_on_ad: false,
      product_ids: [] as string[]
    }
  })

  const handleSelectedProducts = (product: Catalogue, action: "Add" | "Remove") => {
    if (action === "Add") {
      setSelectedProducts((prev) => ([...prev, product]))
      setValue('product_ids', [...watch('product_ids'), product?.product_short_id])
    }
    else if (action === "Remove") {
      setSelectedProducts((prev) => (prev.filter((item) => item?.id !== product?.id)))
      setValue('product_ids', watch('product_ids').filter((shortId) => shortId !== product?.product_short_id))
    }
  }


  const handleCreateCoupon = handleSubmit((data: any) => {
    postCreateCoupon({ ...data }).unwrap()
      .then(() => {
        toast.success("Coupon created successfully")
        router.push('/offers-and-coupons/generic-coupons/generic-coupons-list')
      })
      .catch((error) => {
        toast.success("Couldn't create coupon")
      })
  })

  return {
    control,
    watch,
    setValue,
    selectedProducts,
    handleSelectedProducts,
    handleCreateCoupon,
    isCreating
  }
}

export default useAddGenericCoupon