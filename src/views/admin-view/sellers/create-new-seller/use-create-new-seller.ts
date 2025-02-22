import { useForm } from "react-hook-form";
import { BillingAddressType, CreateSellerFormDataType, PickupAddressType, ReturnAddressType } from "./types/index.type";
import { useState } from "react";
import toast from "react-hot-toast";


const defaultPickUpAddress = {
  nickname: "",
  address: "",
  contact_number: "",
  city: "Fatehpur",
  state: "Uttar Pradesh",
  pincode: "",
  landmark: ""
}

const defaultBillingAddress = {
  company_name: "",
  contact_number: "",
  email: "",
  address: "",
  city: "Patna",
  state: "Bihar",
  pincode: "",
  addr_tag_3pl: "",
}

const defaultReturnAddress = {
  name: "",
  contact_number: "",
  email: "",
  address: "",
  city: "Patna",
  state: "Bihar",
  pincode: "",
}

const useCreateNewSeller = () => {
  const { control, handleSubmit, watch, setValue, getValues, trigger } = useForm<CreateSellerFormDataType>({
    defaultValues: {
      display_name: "",
      first_name: "",
      last_name: "",
      seller_type: "",
      preferred_web_prefix: "",
      email: "",
      contact_number: "",
      whatsapp_number: "",
      additional_login_number: "",
      description: "",
      profile_photo: "",
      settings: {
        payment_mode: ["online", 'cod', 'partial-cod'],
      },
      billing_address: defaultBillingAddress as BillingAddressType,
      pickup_address: [defaultPickUpAddress] as PickupAddressType[],
      return_address: defaultReturnAddress as ReturnAddressType,
      is_same_return_address: true,
      is_gst: false,
      gst_number: '',
    },
  });

  const [activeStep, setActiveStep] = useState(2)

  const billingAddressRequiredFields = [
    'billing_address.addr_tag_3pl',
    'billing_address.company_name',
    'billing_address.contact_number',
    'billing_address.address',
    'billing_address.pincode',
    'billing_address.city',
    'billing_address.state'
  ]

  const pickupAddressRequiredFields = getValues("pickup_address").map((_, index) => [
    `pickup_address.${index}.nickname`,
    `pickup_address.${index}.landmark`,
    `pickup_address.${index}.contact_number`,
    `pickup_address.${index}.pincode`,
    `pickup_address.${index}.city`,
    `pickup_address.${index}.state`,
  ]).flat()

  const returnAddressRequiredFields = [
    'return_address.name',
    'return_address.contact_number',
    'return_address.address',
    'return_address.pincode',
    'return_address.city',
    'return_address.state'
  ]

  const handleActiveStep = async (stepNumber: number) => {
    if (stepNumber > 0 && stepNumber < activeStep) setActiveStep(stepNumber)
    else if (activeStep === 1) {
      const isStepOneValid = await trigger(['display_name', 'first_name', 'seller_type', 'email', 'contact_number'])
      if (isStepOneValid) setActiveStep(stepNumber)
      else toast.error("Please enter the required field")
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await
        (trigger([
          ...billingAddressRequiredFields,
          ...pickupAddressRequiredFields,
          ...(!watch('is_same_return_address') ? returnAddressRequiredFields : []),
          ...(watch("is_gst") ? ["gst_number"] : [])
        ] as any))
      if (isStepTwoValid) setActiveStep(stepNumber)
      else toast.error("Please enter the required field")
    }
  }

  return {
    control,
    watch,
    setValue,
    activeStep,
    handleActiveStep
  }
}

export default useCreateNewSeller